
const programModel = require('../models/program');

module.exports.create = function( req, res) {

    if (!req.body.workoutProgramName) {
        return res.status(500).send("no program defined");
    }


    var program = new programModel({workoutProgramName: req.body.workoutProgramName});
    
    program.userID = req.user._id;
    program.save(function(err,product) {

        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(product);
        }
    })
}
module.exports.delete = function (req , res) {
    if (!req.query.id) {
        return res.status(500).send('No ID in params, failed.');
    }

    programModel.findByIdAndDelete({_id: req.query.id}, function(err, product) {
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

    programModel.findById({_id: req.query.id}, function(err, product) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(product);
        }
    })
}
module.exports.getAll = async function (req , res) {

    programModel.find({ userID: req.user._id }, function(err, doc) {
        if (err) {
     
            res.status(500).send(error);
        }
        res.status(200).send(doc);
    })
} 

module.exports.update = function (req , res) {
    console.log(req.body)
    if (!req.body.WorkoutProgram) {
        return res.status(500).send("no program defined");
    }
    programModel.updateOne({ _id: req.body.WorkoutProgram._id}, req.body.WorkoutProgram, function(err,raw) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(raw);
        }
    });
}
