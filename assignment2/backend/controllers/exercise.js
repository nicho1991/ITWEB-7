const exerciseModel = require('../models/exercise');
const programModel = require('../models/program')

module.exports.create = function(req, res) {
    if (!req.body.exerciseName | !req.query.id) {
        return res.status(500).send('input error');
    }

    var exercise = new exerciseModel(req.body);
    exercise.userID = req.user._id

    var err = exercise.validateSync();
    if (err) {
        return res.status(500).send(err);
    }

    programModel.findById(req.query.id, function(err, program) {
        if (err) {
            return res.status(500).send(err);
        }

        if (!program) {
            return res.status(500).send('could not find program');
        }

        program.exercises.push(exercise._id);
        program.save(function(err, prod) {
            if (err) {
                return res.status(500).send(err);
            }
            exercise.save(function(err2 , prod2) {
                if (err2) {
                    return res.status(500).send(err);
                }
                return res.send('ok')
            });
        });
    })
}

module.exports.delete = function (req , res) {

    const id = req.query.id;

    const ex = req.body[0];

    // send program as id and exercise as body
    if (!id) {
        return res.status(500).send('No ID in params, failed.');
    }
    programModel.findById(id, function(err ,doc) {
     
        if ( err) {
            res.status(500).send(err);
        }
      
  
        if (doc) {
       
            exerciseModel.findOneAndDelete(ex._id, function(exErr , exDoc ) {
             
                if (err) {
                    res.status(500).send(exErr)
                }
          
                if ( exDoc ) {
                 
               
                    const exID = doc.exercises.findIndex(x => x === exDoc._id.toString());
            
                    doc.exercises.splice(exID, 1);
            

    
        
                    programModel.updateOne({_id: id}, doc, function(prerr , prdoc) {
                        if (prdoc) {
                            console.log(prdoc)
                            return res.status(200).send('ok');
                        }
                        if (prerr) {
                            return res.status(500).send(prerr);
                        }
                    });
        
              
                }

            });
            // also delete fromt the program
            

        }
  
    });





    // TODO: 
    // Remember to remove the exercise string id from the exercises array in program.
    // Think we might need to add the programID to the exercise as well! How else are we gonna find it?
}

module.exports.getSingle = function (req , res) {
    if (!req.query.id) {
        return res.status(500).send('No ID in params, failed.');
    }

    exerciseModel.findById({_id: req.query.id}, function(err, product) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(product);
        }
    })
}

module.exports.getAll = async function (req , res) {

    exerciseModel.find({userID: req.user._id}, function(err, doc) {
        if (err) {
            console.log(error)
            res.status(500).send(error);
        }
        res.status(200).send(doc);

    })

}

module.exports.update = function (req , res) {
    if (!req.query.id) {
        return res.status(500).send("no exercise defined");
    }

    exerciseModel.updateOne({_id: req.query.id}, req.body, function(err,raw) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(raw);
        }
    });
}
