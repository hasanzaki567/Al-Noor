const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Teacher who manages this student
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Link to User account (if student has login)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    min: 3,
    max: 100
  },
  // Quran-specific fields
  course: {
    type: String,
    enum: ['Hifz', 'Nazra', 'Tajweed', 'Qaida', 'Tafseer', 'Arabic'],
    default: 'Nazra'
  },
  currentSurah: {
    type: String,
    default: ''
  },
  currentJuz: {
    type: Number,
    default: 1,
    min: 1,
    max: 30
  },
  hifzParasCompleted: {
    type: Number,
    default: 0,
    min: 0,
    max: 30
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  // Schedule
  classDays: {
    type: [String],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    default: []
  },
  classTime: {
    type: String,
    default: ''
  },
  sessionType: {
    type: String,
    enum: ['1-on-1', 'Group'],
    default: '1-on-1'
  },
  // Payment
  monthlyFee: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending'
  },
  lastPaymentDate: {
    type: Date,
    default: null
  },
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
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
studentSchema.index({ teacherId: 1 });
studentSchema.index({ userId: 1 });
studentSchema.index({ email: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
