const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var User = require('./models/user');
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
    console.log(id)
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

module.exports.getUser = function(req) {
  return ExtractJWT.fromAuthHeaderAsBearerToken();

}

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload)
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));