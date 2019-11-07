module.exports = (app) => {
    const program = require('../controllers/program.controller.js');
    const user = require('../controllers/user.controller.js');
    const exercise = require('../controllers/exercise.controller.js');

    app.post('/signup', (req, res) => {
        user.signUp(req, res);
    });

    app.post('/login', (req, res) => {
        user.login(req, res)
    });

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
}