const express = require('express');
const Course = require('../models/Course');
const CourseRegistration = require('../models/CourseRegistration');
const Student = require('../models/Student');
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const router = express.Router();

// Available courses data (matching frontend)
const coursesData = [
  {
    courseId: 'pearls-of-juz-amma',
    title: 'Pearls of Juz Amma',
    description: 'Learn Quran memorization starting from the 30th Juz with expert teachers.',
    price: 450,
    originalPrice: 480,
    sections: '140 Sections',
    hours: '48 Hours',
    maxStudents: 40
  },
  {
    courseId: 'young-quranic-gems',
    title: 'Young Quranic Gems',
    description: 'Interactive Tajweed and Surah memorization course for young kids aged 5.5 to 8 years.',
    price: 750,
    originalPrice: 780,
    sections: '80 Sections',
    hours: '62 Hours',
    maxStudents: 100
  },
  {
    courseId: 'quranic-blossoms',
    title: 'Quranic Blossoms',
    description: 'Online Tajweed and memorization classes for females aged 16–35+, with flexible timings.',
    price: 350,
    originalPrice: 380,
    sections: '160 Sections',
    hours: '60 Hours',
    maxStudents: 30
  },
  {
    courseId: 'quranic-guardians',
    title: 'Quranic Guardians',
    description: 'Quran recitation and memorization course with Tajweed for males aged 19–35+, conducted online.',
    price: 230,
    originalPrice: 280,
    sections: '150 Sections',
    hours: '40 Hours',
    maxStudents: 15
  }
];

// @route   GET /api/courses
// @desc    Get all available courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      courses: coursesData
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses'
    });
  }
});

// @route   GET /api/courses/:courseId
// @desc    Get single course details
// @access  Public
router.get('/:courseId', async (req, res) => {
  try {
    const course = coursesData.find(c => c.courseId === req.params.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course'
    });
  }
});

// @route   POST /api/courses/register
// @desc    Register for a course
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, age, courseId, hifzParasCompleted, userId, password } = req.body;

    // Validate required fields
    if (!name || !email || !age || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, age, and select a course'
      });
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 5 and 100'
      });
    }

    // Find the course
    const course = coursesData.find(c => c.courseId === courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course selected'
      });
    }

    // Check if already registered with same email for this course
    const existingRegistration = await CourseRegistration.findOne({
      email: email.toLowerCase(),
      courseId: courseId
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for this course with this email'
      });
    }

    // Determine access password: use provided password (hashed) or generate temporary one for guests
    let tempPassword = null;
    let hashed = '';
    let returnTempPassword = false;

    if (!userId) {
      // Guest registration: prefer user-supplied password, otherwise generate temporary password
      if (password) {
        if (typeof password !== 'string' || password.length < 6) {
          return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'));
      } else {
        tempPassword = Math.random().toString(36).slice(2, 10); // 8-char temp password
        hashed = await bcrypt.hash(tempPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'));
        returnTempPassword = true;
      }
    } else {
      // Logged-in user: if they provide a password explicitly, hash it and store; otherwise no accessPassword created
      if (password) {
        if (typeof password !== 'string' || password.length < 6) {
          return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'));
      }
    }

    // Create registration
    const registration = new CourseRegistration({
      userId: userId || null,
      courseId: course.courseId,
      courseName: course.title,
      name: name.trim(),
      email: email.toLowerCase(),
      age: ageNum,
      hifzParasCompleted: hifzParasCompleted || 0,
      amount: course.price,
      paymentStatus: 'pending',
      registrationStatus: 'pending'
    });

    // Store hashed access password (if set)
    if (hashed) registration.accessPassword = hashed;

    await registration.save();

    // Auto-add student to all teacher lists (find teachers)
    // Map course name to course type
    const courseTypeMap = {
      'Pearls of Juz Amma': 'Hifz',
      'Young Quranic Gems': 'Tajweed',
      'Quranic Blossoms': 'Tajweed',
      'Quranic Guardians': 'Nazra'
    };

    // Find all teachers and add this student to them
    try {
      const teachers = await User.find({ userType: 'teacher', isActive: true });
      for (const teacher of teachers) {
        // Check if student already exists for this teacher
        const existingStudent = await Student.findOne({
          teacherId: teacher._id,
          email: email.toLowerCase()
        });

        if (!existingStudent) {
          const newStudent = new Student({
            teacherId: teacher._id,
            userId: userId || null,
            name: name.trim(),
            email: email.toLowerCase(),
            age: ageNum,
            course: courseTypeMap[course.title] || 'Nazra',
            hifzParasCompleted: hifzParasCompleted || 0,
            monthlyFee: course.price || 0
          });
          await newStudent.save();
        }
      }
    } catch (studentErr) {
      console.error('Auto-add student error (non-blocking):', studentErr);
    }

    // For guest registrations with password, create a User account and log them in
    let newUser = null;
    if (!userId && (password || tempPassword)) {
      // Check if User with this email already exists
      let existingUser = await User.findOne({ email: email.toLowerCase() });
      if (!existingUser) {
        // Create a new User account (password already hashed above, but User model hashes on save)
        const actualPassword = password || tempPassword;
        existingUser = new User({
          name: name.trim(),
          email: email.toLowerCase(),
          password: actualPassword, // Will be hashed by User model pre-save hook
          userType: 'student'
        });
        await existingUser.save();

        // Link registration to new user
        registration.userId = existingUser._id;
        await registration.save();
      }
      newUser = existingUser;

      // Log the user in (establish session)
      await new Promise((resolve, reject) => {
        req.login(newUser, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! We will contact you shortly.',
      registration: {
        id: registration._id,
        courseName: registration.courseName,
        name: registration.name,
        email: registration.email,
        amount: registration.amount,
        status: registration.registrationStatus,
        // Return the plain temporary password only when server generated it
        ...(returnTempPassword ? { password: tempPassword } : {})
      },
      // Include user data if auto-logged in
      ...(newUser ? { user: newUser.toJSON() } : {})
    });
  } catch (error) {
    console.error('Course registration error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error processing registration'
    });
  }
});

// @route   GET /api/courses/registrations/my
// @desc    Get user's course registrations
// @access  Private (requires authentication)
router.get('/registrations/my', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: 'Please login to view your registrations'
      });
    }

    const registrations = await CourseRegistration.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations'
    });
  }
});

// @route   GET /api/courses/registrations/email/:email
// @desc    Get registrations by email
// @access  Public
router.get('/registrations/email/:email', async (req, res) => {
  try {
    const registrations = await CourseRegistration.find({ 
      email: req.params.email.toLowerCase() 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error('Get registrations by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations'
    });
  }
});

module.exports = router;
