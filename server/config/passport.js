const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple');
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

// Only attach OAuth strategies when required env vars are present
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: (process.env.SERVER_URL || 'http://localhost:5000') + '/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value?.toLowerCase();
      if (!email) return done(new Error('No email from Google'));

      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name: profile.displayName || profile.name?.givenName || 'Google User',
          email,
          password: Math.random().toString(36).slice(2, 12)
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
} else {
  console.warn('Google OAuth not configured: set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
}

if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY_PATH) {
  passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
    callbackURL: (process.env.SERVER_URL || 'http://localhost:5000') + '/api/auth/apple/callback',
    passReqToCallback: false
  }, async (accessToken, refreshToken, idToken, profile, done) => {
    try {
      const email = profile?.email || (idToken && idToken.email) || null;
      if (!email) return done(new Error('No email from Apple'));

      let user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        user = new User({
          name: profile?.name || 'Apple User',
          email: email.toLowerCase(),
          password: Math.random().toString(36).slice(2, 12)
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
} else {
  console.warn('Apple OAuth not fully configured: set APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_KEY_ID, and APPLE_PRIVATE_KEY_PATH');
}

module.exports = passport;
