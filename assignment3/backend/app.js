var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'), Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
var cors = require('cors')
require('./passport');

require('./models/db');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var programRouter = require('./routes/program');
var exerciseRouter = require('./routes/exercise');
var app = express();

app.use(cors({credentials: true, origin: true}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/exercise', passport.authenticate('jwt', {session: false}), exerciseRouter);
app.use('/login' , loginRouter);
app.use('/signup' , signupRouter);
app.use('/program', passport.authenticate('jwt', {session: false}),  programRouter);




app.use(express.static('public'))


//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//expres session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());



//connect flash
app.use(flash());

//global vars

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
})

app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'),function(){
  console.log('Server started on port: ' + app.get('port'));
})

module.exports = app;
