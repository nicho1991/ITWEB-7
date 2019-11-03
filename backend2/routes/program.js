var express = require('express');
var router = express.Router();
const program = require('../controllers/program');


router.post('/', program.create );
router.delete('/' , program.delete); // remeber id
router.get('/single' , program.getSingle);  // remember id
router.get('/all', program.getAll);
router.put('/' ,program.update);

module.exports = router;