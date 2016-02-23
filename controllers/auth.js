var express = require('express');
var db = require('../models');
var passport = require('passport');
var router = express.Router();

// routes here
router.get('/login/facebook', function(req, res) {
  var scope = {scope: ['public_profile', 'email']};

  passport.authenticate('facebook', scope)(req, res);
});

router.get('/callback/facebook', function(req, res) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) throw err;
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        req.flash('success', 'You are now logged in with Facebook');
        res.redirect('/');
      });
    } else {
      req.flash('danger', 'Error');
      res.redirect('/auth/login');
    }
  })(req, res);
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;
