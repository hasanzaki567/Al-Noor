const mongoose = require('mongoose');

// Student Progress Schema - tracks para completion and learning progress
const studentProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: '' },
  
  // Quran Learning Progress
  parasCompleted: { type: Number, default: 0, min: 0, max: 30 },
  currentPara: { type: Number, default: 1, min: 1, max: 30 },
  totalAyahsMemorized: { type: Number, default: 0 },
  tajweedScore: { type: Number, default: 0, min: 0, max: 100 },
  
  // Points & XP
  totalXP: { type: Number, default: 0 },
  weeklyXP: { type: Number, default: 0 },
  monthlyXP: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  
  // Streaks
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActivityDate: { type: Date, default: Date.now },
  
  // Badges earned (array of badge IDs)
  badges: [{ type: String }],
  
  // Weekly contest participation
  weeklyContestRank: { type: Number, default: 0 },
  weeklyContestPoints: { type: Number, default: 0 },
  
  // Course enrollment
  enrolledCourses: [{
    courseId: String,
    courseName: String,
    progress: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Weekly Contest Schema
const weeklyContestSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  year: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  
  participants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String,
    points: { type: Number, default: 0 },
    rank: Number,
    parasCompleted: { type: Number, default: 0 },
    challengesCompleted: { type: Number, default: 0 }
  }],
  
  prizes: [{
    rank: Number,
    prize: String,
    xpBonus: Number
  }]
}, { timestamps: true });

// Best Student of Month Schema
const monthlyAwardSchema = new mongoose.Schema({
  month: { type: Number, required: true }, // 1-12
  year: { type: Number, required: true },
  
  winner: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String,
    totalXP: Number,
    parasCompleted: Number,
    badgesEarned: Number,
    streak: Number
  },
  
  runnerUps: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String,
    totalXP: Number,
    rank: Number
  }]
}, { timestamps: true });

// Badge Definition Schema
const badgeSchema = new mongoose.Schema({
  badgeId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: String,
  icon: { type: String, default: 'fas fa-medal' },
  color: { type: String, default: '#1A9B8E' },
  xpRequired: { type: Number, default: 0 },
  parasRequired: { type: Number, default: 0 },
  streakRequired: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['memorization', 'consistency', 'achievement', 'special'],
    default: 'achievement'
  }
});

// Challenge Schema
const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: ['daily', 'weekly', 'special'],
    default: 'daily'
  },
  xpReward: { type: Number, default: 50 },
  coinReward: { type: Number, default: 10 },
  isActive: { type: Boolean, default: true },
  
  // Requirements
  requirement: {
    type: { type: String }, // 'memorize_ayahs', 'complete_para', 'maintain_streak', 'tajweed_practice'
    target: Number
  },
  
  // Date validity
  validFrom: { type: Date, default: Date.now },
  validUntil: Date
});

// Create indexes
studentProgressSchema.index({ totalXP: -1 });
studentProgressSchema.index({ weeklyXP: -1 });
studentProgressSchema.index({ monthlyXP: -1 });
studentProgressSchema.index({ userId: 1 }, { unique: true });

const StudentProgress = mongoose.model('StudentProgress', studentProgressSchema);
const WeeklyContest = mongoose.model('WeeklyContest', weeklyContestSchema);
const MonthlyAward = mongoose.model('MonthlyAward', monthlyAwardSchema);
const Badge = mongoose.model('Badge', badgeSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
  StudentProgress,
  WeeklyContest,
  MonthlyAward,
  Badge,
  Challenge
};
