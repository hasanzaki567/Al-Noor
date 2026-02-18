const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Salt rounds - higher is more secure but slower
// Recommended: 10-12 for production, can use 10 for development
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  userType: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  specialization: {
    type: String,
    default: ''
  },
  institution: {
    type: String,
    default: 'Al Noor Academy'
  },
  country: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving using bcrypt with salt
userSchema.pre('save', async function(next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate a salt with configured rounds
    // bcrypt automatically embeds the salt in the resulting hash
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method using bcrypt
// bcrypt.compare extracts the salt from the stored hash
// and uses it to hash the candidate password for comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
