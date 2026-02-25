const express = require('express');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Schedule = require('../models/Schedule');
const CourseRegistration = require('../models/CourseRegistration');

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
    const teacherId = req.user._id;
    const totalStudents = await Student.countDocuments({ teacherId, isActive: true });

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

    const attendanceCount = await Attendance.countDocuments({
      teacherId,
      date: { $gte: today, $lt: tomorrow }
    });

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDayName = dayNames[new Date().getDay()];

    const todaysClassesDocs = await Schedule.find({ teacherId, day: todayDayName, isActive: true }).lean();
    const todaysClasses = todaysClassesDocs.map(c => ({ id: c._id, ...c }));

    const recentStudentsDocs = await Student.find({ teacherId, isActive: true }).sort({ createdAt: -1 }).limit(5).lean();
    const recentStudents = recentStudentsDocs.map(s => ({ id: s._id, ...s }));

    res.json({
      success: true,
      dashboard: { totalStudents, todayAttendance: attendanceCount, todaysClasses, recentStudents,
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
    const students = await Student.find({ teacherId: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, students: students.map(s => ({ id: s._id, ...s })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching students' }); }
});

router.post('/students', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { name, email, phone, age, course, level, classDays, classTime, sessionType, monthlyFee, notes } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });

    const student = new Student({
      name,
      email: email || '',
      phone: phone || '',
      age: age || null,
      course: course || 'Hifz',
      level: level || 'Beginner',
      classDays: classDays || [],
      classTime: classTime || '',
      sessionType: sessionType || 'online',
      monthlyFee: monthlyFee || 0,
      paymentStatus: 'pending',
      notes: notes || '',
      teacherId: req.user._id,
      isActive: true
    });

    await student.save();
    // emit student created
    try { req.app.get('io')?.emit('student:created', { id: student._id, ...student.toObject() }); } catch (e) { }
    res.status(201).json({ success: true, student: { id: student._id, ...student.toObject() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error adding student' }); }
});

router.put('/students/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true }).lean();
    // emit student updated for real-time dashboard
    try { req.app.get('io')?.emit('student:updated', { id: updated._id, ...updated }); } catch (e) { }
    res.json({ success: true, student: { id: updated._id, ...updated } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error updating student' }); }
});

router.delete('/students/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Student removed' });
  } catch (error) { res.status(500).json({ success: false, message: 'Error removing student' }); }
});

// Attendance
router.get('/attendance', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const q = { teacherId: req.user._id };
    if (req.query.date) {
      const d = new Date(req.query.date); d.setHours(0,0,0,0);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      q.date = { $gte: d, $lt: next };
    }
    const att = await Attendance.find(q).lean();
    res.json({ success: true, attendance: att.map(a => ({ id: a._id, ...a })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching attendance' }); }
});

router.post('/attendance', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { studentId, date, status, notes, arrivalTime, departureTime } = req.body;
    if (!studentId || !date || !status) return res.status(400).json({ success: false, message: 'Missing fields' });

    const d = new Date(date);
    d.setHours(0,0,0,0);

    const data = { studentId, teacherId: req.user._id, date: d, status, notes: notes || '', arrivalTime: arrivalTime || null, departureTime: departureTime || null };

    // Use atomic upsert to avoid extra reads and reduce DB operations
    await Attendance.findOneAndUpdate(
      { studentId, teacherId: req.user._id, date: d },
      { $set: data, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
    // emit attendance update for real-time listeners (send summary counts for the date)
    try {
      const agg = await Attendance.aggregate([
        { $match: { teacherId: req.user._id, date: d } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const counts = {};
      agg.forEach(a => { counts[a._id || 'unknown'] = a.count; });
      req.app.get('io')?.emit('attendance:update', { teacherId: String(req.user._id), date: d, counts });
    } catch (e) { console.error('Emit attendance error', e); }

    res.json({ success: true, message: 'Attendance recorded' });
  } catch (error) { res.status(500).json({ success: false, message: 'Error marking attendance' }); }
});

router.post('/attendance/bulk', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { date, records } = req.body;
    if (!date || !records) return res.status(400).json({ success: false, message: 'Invalid data' });

    const d = new Date(date); d.setHours(0,0,0,0);

    // Prepare bulk operations for efficient writes (upsert)
    const ops = records.map(r => ({
      updateOne: {
        filter: { studentId: r.studentId, teacherId: req.user._id, date: d },
        update: {
          $set: { status: r.status, notes: r.notes || '', arrivalTime: r.arrivalTime || null, departureTime: r.departureTime || null },
          $setOnInsert: { createdAt: new Date(), studentId: r.studentId, teacherId: req.user._id, date: d }
        },
        upsert: true
      }
    }));

    if (ops.length > 0) {
      await Attendance.bulkWrite(ops, { ordered: false });
    }

    // emit attendance bulk update
    try {
      const agg = await Attendance.aggregate([
        { $match: { teacherId: req.user._id, date: d } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const counts = {};
      agg.forEach(a => { counts[a._id || 'unknown'] = a.count; });
      req.app.get('io')?.emit('attendance:update', { teacherId: String(req.user._id), date: d, counts });
    } catch (e) { console.error('Emit bulk attendance error', e); }

    res.json({ success: true, message: `Attendance marked for ${records.length} students` });
  } catch (error) { res.status(500).json({ success: false, message: 'Error marking bulk attendance' }); }
});

// Schedule
router.get('/schedule', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const q = { teacherId: req.user._id, isActive: true };
    if (req.query.day) q.day = req.query.day;
    const schedules = await Schedule.find(q).sort({ startTime: 1 }).lean();
    res.json({ success: true, schedule: schedules.map(s => ({ id: s._id, ...s })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching schedule' }); }
});

router.post('/schedule', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { studentId, day, startTime, endTime, course, sessionType, notes } = req.body;
    if (!studentId || !day || !startTime) return res.status(400).json({ success: false, message: 'Missing fields' });

    const schedule = new Schedule({
      studentId, teacherId: req.user._id, day, startTime, endTime: endTime || '', title: '', courseType: course || '',
      sessionType: sessionType || 'online', notes: notes || '', isActive: true
    });
    await schedule.save();
    res.status(201).json({ success: true, schedule: { id: schedule._id, ...schedule.toObject() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error creating schedule' }); }
});

router.put('/schedule/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    res.json({ success: true, schedule: { id: updated._id, ...updated } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error updating schedule' }); }
});

router.delete('/schedule/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    await Schedule.findByIdAndUpdate(req.params.id, { isActive: false });
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
    const attRecs = await Attendance.find({ teacherId: req.user._id, date: { $gte: start, $lte: end } }).lean();
    const students = await Student.find({ teacherId: req.user._id, isActive: true }).lean();

    const studentReports = students.map(s => {
      const sAtt = attRecs.filter(a => String(a.studentId) === String(s._id));
      const present = sAtt.filter(a => a.status === 'present').length;
      const absent = sAtt.filter(a => a.status === 'absent').length;
      const late = sAtt.filter(a => a.status === 'late').length;
      const total = present + absent + late;
      return { student: { id: s._id, ...s }, present, absent, late, total, percentage: total > 0 ? Math.round((present + late) / total * 100) : 0 };
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
    const regs = await CourseRegistration.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, registrations: regs.map(r => ({ id: r._id, ...r })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Error fetching registrations' }); }
});

router.post('/import-registration/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const reg = await CourseRegistration.findById(req.params.id).lean();
    if (!reg) return res.status(404).json({ success: false, message: 'Not found' });

    const student = new Student({
      name: reg.name || reg.email,
      email: reg.email,
      phone: '',
      age: reg.age || null,
      course: reg.courseName || 'Hifz',
      level: 'Beginner',
      classDays: reg.preferredDays || [],
      classTime: reg.preferredTime || '',
      sessionType: 'online',
      monthlyFee: 0,
      paymentStatus: 'pending',
      notes: `Imported from registration`,
      teacherId: req.user._id,
      isActive: true
    });
    await student.save();
    await CourseRegistration.findByIdAndUpdate(req.params.id, { imported: true });
    res.json({ success: true, student: { id: student._id, ...student.toObject() } });
  } catch (error) { res.status(500).json({ success: false, message: 'Error importing' }); }
});

module.exports = router;
