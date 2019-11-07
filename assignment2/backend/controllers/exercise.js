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

    programModel.findById(req.query.id , function(err , program) {
        if (err) {
            return res.status(500).send(err);
        }

        if (!program) {
            return res.status(500).send('couldnt find program')
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
}

module.exports.delete = function (req , res) {
    if (!req.query.id) {
        return res.status(500).send('No ID in params, failed.');
    }

    exerciseModel.findByIdAndDelete({_id: req.query.id}, function(err, product) {
        if (err) {
            return res.status(500).send(err);
        } else {
            if (product) {
                return res.status(200).send(product);
            } return res.status(200).send('no matching program to delete')

        }
    })

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
    if (!req.body.exercise) {
        return res.status(500).send("no exercise defined");
    }
    
    exerciseModel.updateOne({_id: req.body.exercise._id}, req.body.exercise, function(err,raw) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(raw);
        }
    });
}
