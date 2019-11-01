var express = require('express');
var router = express.Router();
var exercise = require('../controllers/exercise');

router.post('/exercise/:programId' ,(req, res) => exercise.create(req, res));
router.delete('/exercise/:exerciseId' , (req, res) => exercise.delete(req, res));
router.get('/exercise/:exerciseId' ,(req, res) => exercise.getSingle(req, res)); 
router.get('/exercise/:programId',(req, res) => exercise.getAll(req, res));
router.put('/exercise' ,(req, res) => exercise.update(req, res));

module.exports = router;
