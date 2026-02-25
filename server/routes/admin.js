const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const CourseRegistration = require('../models/CourseRegistration');
const Course = require('../models/Course');

// Simple admin auth using a secret key stored in env var ADMIN_PANEL_KEY
router.post('/auth', async (req, res) => {
  // Support either secret-key access or credential-based admin login
  const { key, email, password } = req.body;

  // 1) Credential-based login (preferred)
  if (email && password) {
    try {
      // Try to find existing user
      let user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        const ok = await user.comparePassword(password);
        if (ok && user.userType === 'admin') {
          req.session.isAdmin = true;
          req.login && req.login(user, () => {});
          return res.json({ success: true, message: 'Admin authenticated', user: user.toJSON() });
        }
        return res.status(401).json({ success: false, message: 'Invalid credentials or not an admin' });
      }

      // If not found, allow special dev bootstrap credentials
      if (email.toLowerCase() === 'admin@gmail.com' && password === '12345678') {
        // create admin user (will hash password via pre-save hook)
        const newUser = new User({ name: 'Administrator', email: email.toLowerCase(), password, userType: 'admin' });
        await newUser.save();
        req.session.isAdmin = true;
        req.login && req.login(newUser, () => {});
        return res.json({ success: true, message: 'Admin user created and authenticated', user: newUser.toJSON() });
      }

      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (err) {
      console.error('Admin auth error', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // 2) Fallback: key-based auth (legacy)
  if (key) {
    if (!process.env.ADMIN_PANEL_KEY) return res.status(500).json({ success: false, message: 'Admin key not configured' });
    if (key === process.env.ADMIN_PANEL_KEY) {
      req.session.isAdmin = true;
      return res.json({ success: true, message: 'Admin authenticated (key)' });
    }
    return res.status(401).json({ success: false, message: 'Invalid admin key' });
  }

  return res.status(400).json({ success: false, message: 'No auth credentials provided' });
});

// middleware
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) return next();
  // allow users with userType 'admin' if logged in
  if (req.user && req.user.userType === 'admin') return next();
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

// Overview: students count, teacher count, fees summary
router.get('/overview', requireAdmin, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments({});
    const activeStudents = await Student.countDocuments({ isActive: true });
    const totalTeachers = await User.countDocuments({ userType: 'teacher' });
    const coursesCount = await Course.countDocuments({});

    // fees: assume Student.monthlyFee and paymentStatus
    const agg = await Student.aggregate([
      { $group: { _id: '$paymentStatus', total: { $sum: '$monthlyFee' }, count: { $sum: 1 } } }
    ]);
    const fees = {};
    agg.forEach(a => { fees[a._id || 'unknown'] = { total: a.total, count: a.count }; });

    // recent activity: latest attendance and registrations
    const recentAttendance = await Attendance.find({}).sort({ createdAt: -1 }).limit(10).lean();
    const recentRegistrations = await CourseRegistration.find().sort({ createdAt: -1 }).limit(8).lean();

    // Provide compatibility keys used by frontend
    const overview = {
      totalStudents,
      activeStudents,
      totalTeachers,
      fees,
      recentAttendance,
      recentRegistrations,
      // convenience keys
      studentsCount: totalStudents,
      teachersCount: totalTeachers,
      coursesCount,
      recentAttendanceCount: recentAttendance.length
    };

    res.json({ success: true, overview });
  } catch (err) {
    console.error('Admin overview error', err);
    res.status(500).json({ success: false, message: 'Error building overview' });
  }
});

// Logout admin session
router.post('/logout', requireAdmin, (req, res) => {
  if (req.session) req.session.isAdmin = false;
  res.json({ success: true, message: 'Admin logged out' });
});

module.exports = router;
