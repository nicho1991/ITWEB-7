
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');


  module.exports.login = (req, res, next) => {
      passport.authenticate('local' , {session: false} , function(err, user, info) {
          if ( !user ) {
              return res.status(400).send('user not found');
          } if ( err ) {
              console.log(1)
              return res.status(400).send(err);
          } else {

              const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
              return res.status(200).json({user, token});
          }
      } )(req, res, next)
  }