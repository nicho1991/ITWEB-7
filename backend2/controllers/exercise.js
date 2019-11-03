 const exerciseModel = require('../models/exercise');
const programModel = require('../models/program')


module.exports.create = async function( req, res) {
    {
        if (!req.body.exercise | !req.query.id) {
            return res.status(500).send('input error');
        }
        var exercise = new exerciseModel(req.body.exercise);
        
        var err = exercise.validateSync();
        if (err) {
            return res.status(500).send(err);
        }
        programModel.findById(req.query.id , function(err , program) {
            if (err) {
                return res.status(500).send(err);
            }
            program.Exercises.push(exercise._id);
            program.save(function(err ,prod) {
                if (err) {
                    return res.status(500).send(err);
                }
                exercise.save(function(err2 , prod2) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.send('ok')
                });
            });
  

   
        })

   /*  var exercise = new exerciseModel({
        Exercise: req.body.exercise,
        Description: req.body.description,
        Set: req.body.set,
        Reps: req.body.reps
        
    }) 
    exercise.save(function (err, product) {
        if(err){
            return res.status(500).send(err);
        }
        programModel.findById(req.query.id, function(err,program){
            if(err){
                return res.status(500).send(err);
            }
            if(!program.exercises){
                program.exercises = new [];
            }
            program.exercises.push(product._id)
            program.save(function(err, resp) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send(resp);
            })
        })
    }); */
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
