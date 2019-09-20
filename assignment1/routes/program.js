var express = require('express');
var router = express.Router();
const CtrlProgram = require('../controllers/program');



/* GET home page. */
router.get('/', CtrlProgram.index);

router.post('/submitNewProgram' , CtrlProgram.submitNewProgram);
module.exports = router;