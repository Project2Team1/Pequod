require('dotenv').config();
const   passport   = require('passport');
const { Strategy } = require('passport-local');

passport.use(
  new Strategy(
    (username, password, done) => {
      if (username !== process.env.ADMIN_ID) {
        return done(null, false, { message: "Wrong admin ID."});
      }
      if (password !== process.env.ADMIN_PW) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, {adminID: true});
    }
  ));

passport.serializeUser( (user, done) => {
  done(null, user.adminID);
});

passport.deserializeUser( (id, done) => {
  if (!id) {
    done({message: "Error at deserializeUser"});
  }
  done(null, {adminID: true});
});

module.exports = passport;