const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Apple OAuth removed to avoid runtime configuration errors.
const User = require('../models/User');

// Local Strategy for email/password authentication
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Check if user is active
      if (!user.isActive) {
        return done(null, false, { message: 'Account is deactivated' });
      }

      // Verify password
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// (Google OAuth removed) If you need Google OAuth later, re-add the
// `passport-google-oauth20` strategy and related env vars.

// (Apple OAuth removed) If you need Apple OAuth later, re-add the
// `passport-apple` strategy and set APPLE_* env vars.

module.exports = passport;
