var express = require('express');
var router = express.Router();
const program = require('../controllers/program');


// GET listAllPrograms
// router.get('/listAllPrograms', ctrlProgram.listAllPrograms);

// POST submitNewProgram
// router.post('/submitNewProgram', ctrlProgram.submitNewProgram);
// router.post('/submitAddExercise', ctrlProgram.addExercise)
// router.get('/workout/:id', ctrlProgram.getWorkout);

router.post('/', program.create );
router.delete('/',program.delete); // remeber id
router.get('/single' , program.getSingle);  // remember id
router.get('/all', program.getAll);
router.put('/' ,program.update);


module.exports = router;


/* 
    //#region Programs
    app.post('/program' , (req, res) => program.new(req, res));
    app.delete('/program/:programId' ,(req, res) => program.delete(req, res));
    app.get('/program/:programId' ,(req, res) => program.getSingle(req, res)); 
    app.get('/program',(req, res) => program.getAll(req, res));
    app.put('/program' ,(req, res) => program.update(req, res));
    //#endregion

    //#region exercises
    app.post('/exercise/:programId' ,(req, res) => exercise.new(req, res));
    app.delete('/exercise/:exerciseId' , (req, res) => exercise.delete(req, res));
    app.get('/exercise/:exerciseId' ,(req, res) => exercise.getSingle(req, res)); 
    app.get('/exercise/:programId',(req, res) => exercise.getAll(req, res));
    app.put('/exercise' ,(req, res) => exercise.update(req, res));
    //#endregion 
    
*/