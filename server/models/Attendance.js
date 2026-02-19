const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    required: true
  },
  // Quran-specific tracking
  surahPracticed: {
    type: String,
    default: ''
  },
  ayahsRevised: {
    type: Number,
    default: 0
  },
  tajweedScore: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate attendance for same student on same date
attendanceSchema.index({ studentId: 1, date: 1, teacherId: 1 }, { unique: true });
attendanceSchema.index({ teacherId: 1, date: 1 });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
