var User = require('../models/user.js');
const jwt = require('jsonwebtoken');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    async function(username, password, done) {
      
      await User.findOne({ email: username }, function(err, user){
          if (err) { return done(err); }
              if (!user) {
              return done(null, false, {
              message: 'Incorrect username.'
              });}  

              User.comparePassword(password, user.password, function(err, isMatch){
                  if(err) throw err;
                  if(isMatch){
                      return done(null, user);
                  } else {
                      return done(null, false, {message: 'Wrong password'})
                  }
              })
                
              
        }
        
        )

    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });



  const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

  module.exports.login = (req, res, next) => {
      passport.authenticate('local' , {session: false} , function(err, user, info) {
          if ( !user ) {
              return res.status(400).send('user not found');
          } if ( err ) {
              return res.status(400).send(err);
          } else {
            console.log(user)
              const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
              return res.status(200).json({user, token});
          }
      } )(req, res, next)
  }