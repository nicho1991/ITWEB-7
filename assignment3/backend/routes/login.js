var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
const CtrlLogin = require('../controllers/login');

router.post('/', CtrlLogin.login);

module.exports = router;
