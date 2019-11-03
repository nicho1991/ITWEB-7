var express = require('express');
var router = express.Router();
var exercise = require('../controllers/exercise');

router.post('/' ,(req, res) => exercise.create(req, res));
router.delete('/' , (req, res) => exercise.delete(req, res));
router.get('/single' ,(req, res) => exercise.getSingle(req, res)); 
router.get('/all',(req, res) => exercise.getAll(req, res));
router.put('/' ,(req, res) => exercise.update(req, res));

module.exports = router;
