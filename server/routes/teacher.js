const express = require('express');
const { db, admin } = require('../config/firebase');

const router = express.Router();

// Middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ success: false, message: 'Not authenticated' });
};

const isTeacher = (req, res, next) => {
  if (req.user && (req.user.userType === 'teacher' || req.user.userType === 'admin')) return next();
  res.status(403).json({ success: false, message: 'Access denied. Teachers only.' });
};

// Dashboard
router.get('/dashboard', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const studentsSnap = await db.collection('students').where('teacherId', '==', teacherId).where('isActive', '==', true).get();
    const totalStudents = studentsSnap.size;

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

    const attendanceSnap = await db.collection('attendance')
      .where('teacherId', '==', teacherId)
      .where('date', '>=', admin.firestore.Timestamp.fromDate(today))
      .where('date', '<', admin.firestore.Timestamp.fromDate(tomorrow)).get();

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDayName = dayNames[new Date().getDay()];

    const classesSnap = await db.collection('schedules')
      .where('teacherId', '==', teacherId).where('day', '==', todayDayName).where('isActive', '==', true).get();
    const todaysClasses = classesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const recentSnap = await db.collection('students')
      .where('teacherId', '==', teacherId).where('isActive', '==', true)
      .orderBy('createdAt', 'desc').limit(5).get();
    const recentStudents = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json({
      success: true,
      dashboard: { totalStudents, todayAttendance: attendanceSnap.size, todaysClasses, recentStudents,
        todayDate: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Error fetching dashboard' });
  }
});

// Students CRUD
router.get('/students', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const snap = await db.collection('students').where('teacherId', '==', req.user.id).orderBy('createdAt', 'desc').get();
    res.json({ success: true, students: snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching students' }); }
});

router.post('/students', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { name, email, phone, age, course, level, classDays, classTime, sessionType, monthlyFee, notes } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });

    const data = { name, email: email || '', phone: phone || '', age: age || null, course: course || 'Hifz', level: level || 'Beginner',
      classDays: classDays || [], classTime: classTime || '', sessionType: sessionType || 'online', monthlyFee: monthlyFee || 0,
      paymentStatus: 'pending', notes: notes || '', teacherId: req.user.id, isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() };

    const ref = await db.collection('students').add(data);
    const doc = await ref.get();
    res.status(201).json({ success: true, student: { id: ref.id, ...doc.data() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error adding student' }); }
});

router.put('/students/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    await db.collection('students').doc(req.params.id).update({ ...req.body, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    const doc = await db.collection('students').doc(req.params.id).get();
    res.json({ success: true, student: { id: doc.id, ...doc.data() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error updating student' }); }
});

router.delete('/students/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    await db.collection('students').doc(req.params.id).update({ isActive: false });
    res.json({ success: true, message: 'Student removed' });
  } catch (error) { res.status(500).json({ success: false, message: 'Error removing student' }); }
});

// Attendance
router.get('/attendance', isAuthenticated, isTeacher, async (req, res) => {
  try {
    let query = db.collection('attendance').where('teacherId', '==', req.user.id);
    if (req.query.date) {
      const d = new Date(req.query.date); d.setHours(0,0,0,0);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      query = query.where('date', '>=', admin.firestore.Timestamp.fromDate(d)).where('date', '<', admin.firestore.Timestamp.fromDate(next));
    }
    const snap = await query.get();
    res.json({ success: true, attendance: snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching attendance' }); }
});

router.post('/attendance', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { studentId, date, status, notes, arrivalTime, departureTime } = req.body;
    if (!studentId || !date || !status) return res.status(400).json({ success: false, message: 'Missing fields' });

    const d = new Date(date); d.setHours(0,0,0,0);
    const existing = await db.collection('attendance').where('studentId', '==', studentId).where('teacherId', '==', req.user.id)
      .where('date', '==', admin.firestore.Timestamp.fromDate(d)).get();

    const data = { studentId, teacherId: req.user.id, date: admin.firestore.Timestamp.fromDate(d), status, notes: notes || '',
      arrivalTime: arrivalTime || null, departureTime: departureTime || null, updatedAt: admin.firestore.FieldValue.serverTimestamp() };

    if (!existing.empty) {
      await db.collection('attendance').doc(existing.docs[0].id).update(data);
      res.json({ success: true, message: 'Attendance updated' });
    } else {
      data.createdAt = admin.firestore.FieldValue.serverTimestamp();
      await db.collection('attendance').add(data);
      res.json({ success: true, message: 'Attendance marked' });
    }
  } catch (error) { res.status(500).json({ success: false, message: 'Error marking attendance' }); }
});

router.post('/attendance/bulk', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { date, records } = req.body;
    if (!date || !records) return res.status(400).json({ success: false, message: 'Invalid data' });

    const d = new Date(date); d.setHours(0,0,0,0);
    const batch = db.batch();

    for (const r of records) {
      const existing = await db.collection('attendance').where('studentId', '==', r.studentId)
        .where('teacherId', '==', req.user.id).where('date', '==', admin.firestore.Timestamp.fromDate(d)).get();
      const data = { studentId: r.studentId, teacherId: req.user.id, date: admin.firestore.Timestamp.fromDate(d),
        status: r.status, notes: r.notes || '', updatedAt: admin.firestore.FieldValue.serverTimestamp() };
      if (!existing.empty) batch.update(db.collection('attendance').doc(existing.docs[0].id), data);
      else { data.createdAt = admin.firestore.FieldValue.serverTimestamp(); batch.set(db.collection('attendance').doc(), data); }
    }
    await batch.commit();
    res.json({ success: true, message: `Attendance marked for ${records.length} students` });
  } catch (error) { res.status(500).json({ success: false, message: 'Error marking bulk attendance' }); }
});

// Schedule
router.get('/schedule', isAuthenticated, isTeacher, async (req, res) => {
  try {
    let query = db.collection('schedules').where('teacherId', '==', req.user.id).where('isActive', '==', true);
    if (req.query.day) query = query.where('day', '==', req.query.day);
    const snap = await query.orderBy('startTime').get();
    res.json({ success: true, schedule: snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching schedule' }); }
});

router.post('/schedule', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { studentId, day, startTime, endTime, course, sessionType, notes } = req.body;
    if (!studentId || !day || !startTime) return res.status(400).json({ success: false, message: 'Missing fields' });

    const ref = await db.collection('schedules').add({
      studentId, teacherId: req.user.id, day, startTime, endTime: endTime || '', course: course || '',
      sessionType: sessionType || 'online', notes: notes || '', isActive: true, createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    const doc = await ref.get();
    res.status(201).json({ success: true, schedule: { id: ref.id, ...doc.data() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error creating schedule' }); }
});

router.put('/schedule/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    await db.collection('schedules').doc(req.params.id).update(req.body);
    const doc = await db.collection('schedules').doc(req.params.id).get();
    res.json({ success: true, schedule: { id: doc.id, ...doc.data() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error updating schedule' }); }
});

router.delete('/schedule/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    await db.collection('schedules').doc(req.params.id).update({ isActive: false });
    res.json({ success: true, message: 'Schedule deleted' });
  } catch (error) { res.status(500).json({ success: false, message: 'Error deleting schedule' }); }
});

// Reports
router.get('/reports', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const month = parseInt(req.query.month) || new Date().getMonth();
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0, 23, 59, 59);

    const attSnap = await db.collection('attendance').where('teacherId', '==', req.user.id)
      .where('date', '>=', admin.firestore.Timestamp.fromDate(start))
      .where('date', '<=', admin.firestore.Timestamp.fromDate(end)).get();
    const studSnap = await db.collection('students').where('teacherId', '==', req.user.id).where('isActive', '==', true).get();

    const students = studSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const attRecs = attSnap.docs.map(d => d.data());

    const studentReports = students.map(s => {
      const sAtt = attRecs.filter(a => a.studentId === s.id);
      const present = sAtt.filter(a => a.status === 'present').length;
      const absent = sAtt.filter(a => a.status === 'absent').length;
      const late = sAtt.filter(a => a.status === 'late').length;
      const total = present + absent + late;
      return { student: s, present, absent, late, total, percentage: total > 0 ? Math.round((present + late) / total * 100) : 0 };
    });

    res.json({ success: true, reports: { month, year, overview: {
      totalPresent: studentReports.reduce((s, r) => s + r.present, 0),
      totalAbsent: studentReports.reduce((s, r) => s + r.absent, 0),
      totalLate: studentReports.reduce((s, r) => s + r.late, 0),
      totalStudents: students.length
    }, studentReports }});
  } catch (error) { res.status(500).json({ success: false, message: 'Error generating reports' }); }
});

// Registrations
router.get('/registrations', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const snap = await db.collection('registrations').orderBy('createdAt', 'desc').get();
    res.json({ success: true, registrations: snap.docs.map(d => ({ id: d.id, ...d.data() })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching registrations' }); }
});

router.post('/import-registration/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const doc = await db.collection('registrations').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Not found' });

    const reg = doc.data();
    const studentRef = await db.collection('students').add({
      name: reg.parentName || reg.email, email: reg.email, phone: reg.phone || '', age: reg.studentAge || null,
      course: reg.courseName || 'Hifz', level: 'Beginner', classDays: reg.preferredDays || [], classTime: reg.preferredTime || '',
      sessionType: 'online', monthlyFee: 0, paymentStatus: 'pending', notes: `Imported from registration`,
      teacherId: req.user.id, isActive: true, createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('registrations').doc(req.params.id).update({ imported: true });
    const newDoc = await studentRef.get();
    res.json({ success: true, student: { id: studentRef.id, ...newDoc.data() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error importing' }); }
});

module.exports = router;
