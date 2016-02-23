var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var db = require('./models');
var passport = require('passport');
var strategies = require('./config/strategies');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(flash());
app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);
passport.use(strategies.facebookStrategy);

app.use(function(req,res,next){
  res.locals.user = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.use('/', require('./controllers/main'));
app.use('/auth', require('./controllers/auth'));

app.listen(3000);
