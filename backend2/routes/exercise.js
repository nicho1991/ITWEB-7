var express = require('express');
var router = express.Router();
var exercise = require('../controllers/exercise');

router.post('/:programId' ,(req, res) => exercise.create(req, res));
router.delete('/:exerciseId' , (req, res) => exercise.delete(req, res));
router.get('/:exerciseId' ,(req, res) => exercise.getSingle(req, res)); 
router.get('/:programId',(req, res) => exercise.getAll(req, res));
router.put('/' ,(req, res) => exercise.update(req, res));

module.exports = router;
