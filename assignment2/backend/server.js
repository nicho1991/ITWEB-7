var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var path = require('path');
// create express app
const app = express();



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

app.use(passport.initialize());
app.use(passport.session());


mongoose.Promise = global.Promise;
app.use(cookieParser());
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

//routes
require('./routes/routes.js')(app);


//connect flash
app.use(flash());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  app.use(express.static('public'))

  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
  })

app.set('port', (process.env.PORT || 5000));
// listen for requests
app.listen(app.get('port'), () => {
    console.log("Server is listening on port" + app.get('port'));
});

module.exports = app;