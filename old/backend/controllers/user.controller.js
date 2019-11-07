var User = require('../models/user.js');
var passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;

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
                console.log(password, User.password);
                  if(err) throw err;
                  if(isMatch){
                      return done(null, user);
                  } else {
                      return done(null, false, {message: 'Wrong password'})
                  }
              })
                
              
        }
        
        )
/*         console.log(password, User.password, user.password);
         */
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

module.exports.signUp  = function (req, res) {

    console.log(req.body)
    if(!req.body) {
       
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    //check fejl her
    if(name.length < 1){console.log('Fejl i navn')
        return res.status(400).send('fejl i navn');}

    else{
        var newUser = new User({
            name: name,
            email: email,
            password: password,

        });
        User.createUser(newUser, function(err, user){
            if(err) {
                return res.status(500).send(err);
                throw err
            }
        });
        res.status(200).send('ok');
    }
}




// login
module.exports.login  = function (req, res) {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    console.log(req.body);
    passport.authenticate('local', (err , user) => {
        console.log(1)
        if(err) {
            return res.status(500).send(err);
        }

        if (!user) {
            return res.status(400).send('fejl');
        }

        return res.status(200).send(user);
    });
 }





