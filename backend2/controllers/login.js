var User = require('../models/user.js');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    async function(username, password, done) {
      console.log('user creds ' , username,password);
      
      await User.findOne({ email: username }, function(err, user){
          console.log('user was ' , user);
          if (err) { return done(err); }
              if (!user) {
              return done(null, false, {
              message: 'Incorrect username.'
              });}  

              User.comparePassword(password, user.password, function(err, isMatch){

                console.log(password, user.password);
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

  module.exports.login = (req, res, next) => {
      passport.authenticate('local', function(err, user, info) {
          if ( !user ) {
              return res.status(400).send('user not found');
          } if ( err ) {
              return res.status(400).send(err);
          } else {
              res.status(200).send(user);
          }
      } )(req, res, next)
  }