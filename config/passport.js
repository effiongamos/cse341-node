const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { generateToken } = require('../middleware/authMiddleware');

module.exports = function (passport) {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    console.warn('⚠️ Google OAuth not configured — skipping strategy');
    return;
  }

  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          role: 'user', // default role
        });
        await user.save();
      }

      // Generate JWT
      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role || 'user'
      });

      user.token = token; // Add token to returned user
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  // For session-based auth (can be skipped if you're using JWT only)
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
};
