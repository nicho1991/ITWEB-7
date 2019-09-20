var express = require('express');
var router = express.Router();
const CtrlUsers = require('../controllers/login');



/* GET home page. */
router.get('/', CtrlUsers.index);

router.post('/submit' , CtrlUsers.submit);


module.exports = router;