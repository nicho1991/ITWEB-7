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
var highscoresRouter = require('./routes/highscore');
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


app.use('/login' , loginRouter);
app.use('/signup' , signupRouter);
app.use('/score' , passport.authenticate('jwt' , {session: true}), highscoresRouter);



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

// WEBSOCKET

const ws = require('ws').Server
var http = require('http');

var server = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Welcome to Node.js on OpenShift!\n\n");
  response.end("Thanks for visiting us! \n");
});

server.listen(8080, function () {
  console.log((new Date()) + ' Server is listening on port 8080');
});

var wss = new ws({
  server: server,

});
const scoreModel = require('./models/highscore');
wss.on('connection',webscocket =>  {

  console.log("New connection");

  wss.clients.forEach(client => {
    scoreModel.find(function (err, doc){
      console.log(doc)
      client.send(JSON.stringify(doc))
    })

  })

  webscocket.onmessage = (message) => {
    var object = JSON.parse(message.data)


    console.log(object.token)
    console.log(object.score)
  }

  // webscocket.send('Hello from the two-way WebSocket server');

});



module.exports = app;
