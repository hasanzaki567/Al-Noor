const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  sections: {
    type: String,
    default: ''
  },
  hours: {
    type: String,
    default: ''
  },
  maxStudents: {
    type: Number,
    default: 50
  },
  enrolledCount: {
    type: Number,
    default: 0
  },
  instructor: {
    type: String,
    default: 'Shaik Zaid'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
