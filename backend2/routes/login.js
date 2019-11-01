var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
const CtrlLogin = require('../controllers/login');

router.post('/', CtrlLogin.login);

router.post('/logout',
  function(req, res) {
    req.logout(),
    res.redirect('/');
  })

module.exports = router;
