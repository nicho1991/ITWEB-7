var express = require('express');
var router = express.Router();
const CtrlUsers = require('../controllers/signup');



/* GET home page. */
router.get('/', CtrlUsers.index);


module.exports = router;