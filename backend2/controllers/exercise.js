 const exerciseModel = require('../models/exercise');
const programModel = require('../models/program')


module.exports.create = async function( req, res) {
    {
    var exercise = new exerciseModel({
        Exercise: req.body.exercise,
        Description: req.body.description,
        Set: req.body.set,
        Reps: req.body.reps
        
    })
    exercise.save(function (err, product) {
        if(err){
            return res.status(500).send(err);
        }
        programModel.findById(req.body.programId, function(err,program){
            console.log(1)
            if(err){
                console.log(2)
                return res.status(500).send(err);
            }
            console.log(program.exercises)
            if(!program.exercises){
                console.log(3)
                program.exercises = new [];
            }
            console.log(4)
            program.exercises.push(product._id)
            program.save(function(err, resp) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send(resp);
            })
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
