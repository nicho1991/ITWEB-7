var express = require('express');
var router = express.Router();

const CtrlScore = require('../controllers/highscore');

router.post('/create', CtrlScore.create);

module.exports = router;
