var express = require('express');
var router = express.Router();
const CtrlWorkout = require('../controllers/workout');



/* GET home page. */
router.get('/', CtrlWorkout.index);

module.exports = router;