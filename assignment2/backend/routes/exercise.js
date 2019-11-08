var express = require('express');
var router = express.Router();
var exercise = require('../controllers/exercise');

router.post('/' , exercise.create);
router.post('/delete' , exercise.delete);
router.get('/single' ,exercise.getSingle); 
router.get('/all', exercise.getAll);
router.put('/' , exercise.update);

module.exports = router;
