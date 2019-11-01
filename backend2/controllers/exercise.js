 const exerciseModel = require('../models/exercise');
const programModel = require('../models/program')


module.exports.create = async function( req, res) {
    {
    var exercise = new exerciseModel({
        exercise: req.body.exercise,
        description: req.body.description,
        exerset: req.body.set,
        rep: req.body.reps
        
    })
    exercise.save(function (err, product) {
        if(err){
            return res.status(500).send(err);
        }
        programModel.findById(req.body.programId, function(err,program){
            if(err){
                return res.status(500).send(err);
            }
            if(!program.exercises){
                program.exercises = [];
            }
            program.exercises.push(product._id)
            program.save()
        })
    });
}



module.exports.delete = function (req , res) {}
module.exports.getSingle = async function (req , res) {
    if (req._passport.session) {
        const docget = await getxercise(req.body.programId);
        docget.Exercise.push(req.body.exercise);
        docget.Description.push(req.body.description);
        docget.Set.push(req.body.set);
        docget.Reps.push(req.body.reps);
        docget.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
    
    } 
}
}
module.exports.getAll = function (req , res) {}
module.exports.update = function (req , res) {}
