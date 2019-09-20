var express = require('express');
var router = express.Router();
const CtrlUsers = require('../controllers/users');



/* GET home page. */
router.get('/', CtrlUsers.index);


module.exports = router;