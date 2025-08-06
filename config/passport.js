const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = function(passportInstance) {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    console.warn(' Google OAuth not configured — skipping strategy');
    return;
  }

  passportInstance.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL: '/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          displayusername: profile.displayuswername,
          email: profile.emails[0].value,
        });
        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  passportInstance.serializeUser((user, done) => done(null, user.id));
  passportInstance.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user)).catch(err => done(err, null));
  });
};
