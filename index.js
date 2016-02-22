var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(flash());
app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req,res,next){
  res.locals.user = null;
  res.locals.alerts = req.flash();
  next();
});

app.use('/', require('./controllers/main'));
app.use('/auth', require('./controllers/auth'));

app.listen(3000);
