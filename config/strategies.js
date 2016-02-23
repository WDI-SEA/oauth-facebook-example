var db = require('../models');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {
  serializeUser: function(user, done) {
    done(null, user.id);
  },
  deserializeUser: function(id, done) {
    db.user.findById(id).then(function(user) {
      done(null, user.get());
    }).catch(done);
  },
  facebookStrategy: new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
    profileFields: ['email', 'displayName']
  }, function(accessToken, refreshToken, profile, done) {
    db.user.findOrCreate({
      where: {pid: profile.id},
      defaults: {
        name: profile.displayName,
        email: profile.emails[0].value,
      }
    }).spread(function(user, created) {
      user.token = accessToken;
      user.save().then(function() {
        done(null, user.get());
      });
    }).catch(done);
  })
}
