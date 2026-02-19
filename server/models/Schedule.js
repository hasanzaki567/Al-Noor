const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  },
  title: {
    type: String,
    required: [true, 'Class title is required'],
    trim: true
  },
  courseType: {
    type: String,
    enum: ['Hifz', 'Nazra', 'Tajweed', 'Qaida', 'Tafseer', 'Arabic', 'General'],
    default: 'General'
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  sessionType: {
    type: String,
    enum: ['1-on-1', 'Group'],
    default: '1-on-1'
  },
  isRecurring: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

scheduleSchema.index({ teacherId: 1, day: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
