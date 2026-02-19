const express = require('express');
const User = require('../models/User');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Schedule = require('../models/Schedule');
const CourseRegistration = require('../models/CourseRegistration');

const router = express.Router();

// Middleware: Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Not authenticated' });
};

// Middleware: Check if user is a teacher
const isTeacher = (req, res, next) => {
  if (req.user && (req.user.userType === 'teacher' || req.user.userType === 'admin')) {
    return next();
  }
  res.status(403).json({ success: false, message: 'Access denied. Teachers only.' });
};

// ==========================================
// DASHBOARD
// ==========================================

// @route   GET /api/teacher/dashboard
// @desc    Get teacher dashboard data
// @access  Private (Teacher)
router.get('/dashboard', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const teacherId = req.user._id;

    // Get total students
    const totalStudents = await Student.countDocuments({ teacherId, isActive: true });

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's attendance count
    const todayAttendance = await Attendance.countDocuments({
      teacherId,
      date: { $gte: today, $lt: tomorrow }
    });

    // Get today's day name for schedule
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDayName = dayNames[new Date().getDay()];

    // Get today's classes
    const todaysClasses = await Schedule.find({
      teacherId,
      day: todayDayName,
      isActive: true
    }).populate('studentId', 'name course level');

    // Get recent students (last 5)
    const recentStudents = await Student.find({ teacherId, isActive: true })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get this month's attendance stats
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthAttendance = await Attendance.aggregate([
      {
        $match: {
          teacherId: req.user._id,
          date: { $gte: monthStart, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const attendanceStats = {};
    monthAttendance.forEach(stat => {
      attendanceStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      dashboard: {
        totalStudents,
        todayAttendance,
        todaysClasses,
        recentStudents,
        attendanceStats,
        todayDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Error fetching dashboard data' });
  }
});

// ==========================================
// STUDENTS MANAGEMENT
// ==========================================

// @route   GET /api/teacher/students
// @desc    Get all students for this teacher
// @access  Private (Teacher)
router.get('/students', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const students = await Student.find({ teacherId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ success: false, message: 'Error fetching students' });
  }
});

// @route   POST /api/teacher/students
// @desc    Add a new student (teacher can create student account too)
// @access  Private (Teacher)
router.post('/students', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const {
      name, email, phone, age, course, level,
      classDays, classTime, sessionType,
      monthlyFee, password, notes, createAccount
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Student name is required' });
    }

    let userId = null;

    // If teacher wants to create a login account for the student
    if (createAccount && email && password) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        // Link to existing user
        userId = existingUser._id;
      } else {
        // Create new user account for the student
        const newUser = new User({
          name,
          email: email.toLowerCase(),
          password,
          userType: 'student',
          institution: 'Al Noor Academy'
        });
        await newUser.save();
        userId = newUser._id;
      }
    }

    const student = new Student({
      teacherId: req.user._id,
      userId,
      name: name.trim(),
      email: email ? email.toLowerCase() : '',
      phone: phone || '',
      age: age || null,
      course: course || 'Nazra',
      level: level || 'Beginner',
      classDays: classDays || [],
      classTime: classTime || '',
      sessionType: sessionType || '1-on-1',
      monthlyFee: monthlyFee || 0,
      notes: notes || ''
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      student,
      accountCreated: !!userId
    });
  } catch (error) {
    console.error('Add student error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Error adding student' });
  }
});

// @route   PUT /api/teacher/students/:id
// @desc    Update a student
// @access  Private (Teacher)
router.put('/students/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, teacherId: req.user._id });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const allowedUpdates = [
      'name', 'email', 'phone', 'age', 'course', 'currentSurah', 'currentJuz',
      'hifzParasCompleted', 'level', 'classDays', 'classTime', 'sessionType',
      'monthlyFee', 'paymentStatus', 'lastPaymentDate', 'isActive', 'notes'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    await student.save();

    res.json({ success: true, message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ success: false, message: 'Error updating student' });
  }
});

// @route   DELETE /api/teacher/students/:id
// @desc    Delete a student
// @access  Private (Teacher)
router.delete('/students/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      teacherId: req.user._id
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Also delete related attendance records
    await Attendance.deleteMany({ studentId: req.params.id, teacherId: req.user._id });

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ success: false, message: 'Error deleting student' });
  }
});

// ==========================================
// ATTENDANCE
// ==========================================

// @route   GET /api/teacher/attendance
// @desc    Get attendance records (with date filter)
// @access  Private (Teacher)
router.get('/attendance', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { date, startDate, endDate, studentId } = req.query;
    const query = { teacherId: req.user._id };

    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const nextDay = new Date(d);
      nextDay.setDate(nextDay.getDate() + 1);
      query.date = { $gte: d, $lt: nextDay };
    } else if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (studentId) {
      query.studentId = studentId;
    }

    const attendance = await Attendance.find(query)
      .populate('studentId', 'name course level')
      .sort({ date: -1 });

    res.json({ success: true, attendance });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ success: false, message: 'Error fetching attendance' });
  }
});

// @route   POST /api/teacher/attendance
// @desc    Mark attendance for a student
// @access  Private (Teacher)
router.post('/attendance', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { studentId, date, status, surahPracticed, ayahsRevised, tajweedScore, notes } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: 'Student, date, and status are required'
      });
    }

    // Verify student belongs to this teacher
    const student = await Student.findOne({ _id: studentId, teacherId: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Check if attendance already exists for this student on this date
    let attendance = await Attendance.findOne({
      studentId,
      teacherId: req.user._id,
      date: attendanceDate
    });

    if (attendance) {
      // Update existing
      attendance.status = status;
      attendance.surahPracticed = surahPracticed || '';
      attendance.ayahsRevised = ayahsRevised || 0;
      attendance.tajweedScore = tajweedScore || null;
      attendance.notes = notes || '';
      await attendance.save();
    } else {
      // Create new
      attendance = new Attendance({
        teacherId: req.user._id,
        studentId,
        date: attendanceDate,
        status,
        surahPracticed: surahPracticed || '',
        ayahsRevised: ayahsRevised || 0,
        tajweedScore: tajweedScore || null,
        notes: notes || ''
      });
      await attendance.save();
    }

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      attendance
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ success: false, message: 'Error marking attendance' });
  }
});

// @route   POST /api/teacher/attendance/bulk
// @desc    Mark attendance for multiple students
// @access  Private (Teacher)
router.post('/attendance/bulk', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { date, records } = req.body;

    if (!date || !records || !Array.isArray(records)) {
      return res.status(400).json({
        success: false,
        message: 'Date and attendance records are required'
      });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const results = [];

    for (const record of records) {
      try {
        let attendance = await Attendance.findOne({
          studentId: record.studentId,
          teacherId: req.user._id,
          date: attendanceDate
        });

        if (attendance) {
          attendance.status = record.status;
          attendance.surahPracticed = record.surahPracticed || '';
          attendance.notes = record.notes || '';
          await attendance.save();
        } else {
          attendance = new Attendance({
            teacherId: req.user._id,
            studentId: record.studentId,
            date: attendanceDate,
            status: record.status,
            surahPracticed: record.surahPracticed || '',
            notes: record.notes || ''
          });
          await attendance.save();
        }
        results.push({ studentId: record.studentId, success: true });
      } catch (err) {
        results.push({ studentId: record.studentId, success: false, error: err.message });
      }
    }

    res.json({
      success: true,
      message: 'Bulk attendance marked',
      results
    });
  } catch (error) {
    console.error('Bulk attendance error:', error);
    res.status(500).json({ success: false, message: 'Error marking bulk attendance' });
  }
});

// ==========================================
// REPORTS
// ==========================================

// @route   GET /api/teacher/reports
// @desc    Get monthly attendance reports
// @access  Private (Teacher)
router.get('/reports', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { month, year } = req.query;

    const reportMonth = month ? parseInt(month) : new Date().getMonth();
    const reportYear = year ? parseInt(year) : new Date().getFullYear();

    const startDate = new Date(reportYear, reportMonth, 1);
    const endDate = new Date(reportYear, reportMonth + 1, 0, 23, 59, 59);

    // Get all students
    const students = await Student.find({ teacherId: req.user._id, isActive: true });

    // Get attendance for the month
    const attendance = await Attendance.find({
      teacherId: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    });

    // Build report per student
    const studentReports = students.map(student => {
      const studentAttendance = attendance.filter(
        a => a.studentId.toString() === student._id.toString()
      );

      const present = studentAttendance.filter(a => a.status === 'present').length;
      const absent = studentAttendance.filter(a => a.status === 'absent').length;
      const late = studentAttendance.filter(a => a.status === 'late').length;
      const excused = studentAttendance.filter(a => a.status === 'excused').length;
      const total = present + absent + late + excused;
      const percentage = total > 0 ? Math.round((present + late) / total * 100) : 0;

      return {
        student: {
          _id: student._id,
          name: student.name,
          course: student.course,
          level: student.level
        },
        attendance: {
          present,
          absent,
          late,
          excused,
          total,
          percentage
        }
      };
    });

    // Overall stats
    const totalPresent = attendance.filter(a => a.status === 'present').length;
    const totalAbsent = attendance.filter(a => a.status === 'absent').length;
    const totalRecords = attendance.length;

    res.json({
      success: true,
      report: {
        month: reportMonth,
        year: reportYear,
        monthName: new Date(reportYear, reportMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalStudents: students.length,
        overallAttendance: totalRecords > 0 ? Math.round(totalPresent / totalRecords * 100) : 0,
        totalPresent,
        totalAbsent,
        totalRecords,
        studentReports
      }
    });
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({ success: false, message: 'Error generating reports' });
  }
});

// ==========================================
// SCHEDULE (Classes)
// ==========================================

// @route   GET /api/teacher/schedule
// @desc    Get teacher's schedule
// @access  Private (Teacher)
router.get('/schedule', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { day } = req.query;
    const query = { teacherId: req.user._id, isActive: true };

    if (day) {
      query.day = day;
    }

    const schedule = await Schedule.find(query)
      .populate('studentId', 'name course level')
      .sort({ day: 1, startTime: 1 });

    res.json({ success: true, schedule });
  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({ success: false, message: 'Error fetching schedule' });
  }
});

// @route   POST /api/teacher/schedule
// @desc    Add a class to schedule
// @access  Private (Teacher)
router.post('/schedule', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const { title, courseType, day, startTime, endTime, sessionType, studentId, isRecurring, notes } = req.body;

    if (!title || !day || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Title, day, start time, and end time are required'
      });
    }

    // If studentId provided, verify it belongs to this teacher
    if (studentId) {
      const student = await Student.findOne({ _id: studentId, teacherId: req.user._id });
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
    }

    const scheduleItem = new Schedule({
      teacherId: req.user._id,
      studentId: studentId || null,
      title,
      courseType: courseType || 'General',
      day,
      startTime,
      endTime,
      sessionType: sessionType || '1-on-1',
      isRecurring: isRecurring !== false,
      notes: notes || ''
    });

    await scheduleItem.save();

    // Populate student info before returning
    await scheduleItem.populate('studentId', 'name course level');

    res.status(201).json({
      success: true,
      message: 'Class added to schedule',
      schedule: scheduleItem
    });
  } catch (error) {
    console.error('Add schedule error:', error);
    res.status(500).json({ success: false, message: 'Error adding to schedule' });
  }
});

// @route   PUT /api/teacher/schedule/:id
// @desc    Update a schedule item
// @access  Private (Teacher)
router.put('/schedule/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const scheduleItem = await Schedule.findOne({ _id: req.params.id, teacherId: req.user._id });

    if (!scheduleItem) {
      return res.status(404).json({ success: false, message: 'Schedule item not found' });
    }

    const allowedUpdates = ['title', 'courseType', 'day', 'startTime', 'endTime', 'sessionType', 'studentId', 'isRecurring', 'isActive', 'notes'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        scheduleItem[field] = req.body[field];
      }
    });

    await scheduleItem.save();
    await scheduleItem.populate('studentId', 'name course level');

    res.json({ success: true, message: 'Schedule updated', schedule: scheduleItem });
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ success: false, message: 'Error updating schedule' });
  }
});

// @route   DELETE /api/teacher/schedule/:id
// @desc    Delete a schedule item
// @access  Private (Teacher)
router.delete('/schedule/:id', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const scheduleItem = await Schedule.findOneAndDelete({
      _id: req.params.id,
      teacherId: req.user._id
    });

    if (!scheduleItem) {
      return res.status(404).json({ success: false, message: 'Schedule item not found' });
    }

    res.json({ success: true, message: 'Schedule item deleted' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ success: false, message: 'Error deleting schedule item' });
  }
});

// ==========================================
// COURSE REGISTRATIONS -> AUTO ADD STUDENT
// ==========================================

// @route   POST /api/teacher/import-registration/:registrationId
// @desc    Import a course registration as a student
// @access  Private (Teacher)
router.post('/import-registration/:registrationId', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const registration = await CourseRegistration.findById(req.params.registrationId);

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    // Check if student already exists with this email for this teacher
    const existing = await Student.findOne({
      teacherId: req.user._id,
      email: registration.email
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists in your list'
      });
    }

    // Map course name to course type
    const courseMap = {
      'Pearls of Juz Amma': 'Hifz',
      'Young Quranic Gems': 'Tajweed',
      'Quranic Blossoms': 'Tajweed',
      'Quranic Guardians': 'Nazra'
    };

    const student = new Student({
      teacherId: req.user._id,
      userId: registration.userId || null,
      name: registration.name,
      email: registration.email,
      age: registration.age,
      course: courseMap[registration.courseName] || 'Nazra',
      hifzParasCompleted: registration.hifzParasCompleted || 0,
      monthlyFee: registration.amount || 0
    });

    await student.save();

    // Update registration status
    registration.registrationStatus = 'enrolled';
    await registration.save();

    res.json({
      success: true,
      message: `${registration.name} added as your student`,
      student
    });
  } catch (error) {
    console.error('Import registration error:', error);
    res.status(500).json({ success: false, message: 'Error importing registration' });
  }
});

// @route   GET /api/teacher/registrations
// @desc    Get pending course registrations
// @access  Private (Teacher)
router.get('/registrations', isAuthenticated, isTeacher, async (req, res) => {
  try {
    const registrations = await CourseRegistration.find({
      registrationStatus: { $in: ['pending', 'approved'] }
    }).sort({ createdAt: -1 });

    res.json({ success: true, registrations });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ success: false, message: 'Error fetching registrations' });
  }
});

module.exports = router;
