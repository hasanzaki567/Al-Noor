const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema({
  // Link to User (optional - can register without account)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  // Link to Course
  courseId: {
    type: String,
    required: [true, 'Course selection is required']
  },
  courseName: {
    type: String,
    required: true
  },
  // Registration details
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [5, 'Minimum age is 5 years'],
    max: [100, 'Maximum age is 100 years']
  },
  // Optional Hifz progress
  hifzParasCompleted: {
    type: Number,
    default: 0,
    min: 0,
    max: 30
  },
  // Payment and status
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'enrolled', 'completed', 'cancelled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient queries
courseRegistrationSchema.index({ email: 1, courseId: 1 });
courseRegistrationSchema.index({ userId: 1 });

const CourseRegistration = mongoose.model('CourseRegistration', courseRegistrationSchema);

module.exports = CourseRegistration;
