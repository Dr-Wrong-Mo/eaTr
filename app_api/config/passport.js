const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Chefs = mongoose.model('Chefs');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (username, password, done) => {
      Chefs.findOne({ email: username }, (err, chef) => {
        if (err) {
          return done(err);
        }
        if (!chef) {
          return done(null, false, {
            message: 'Incorrect chefname.',
          });
        }
        if (!chef.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        return done(null, chef);
      });
    }
  )
);
