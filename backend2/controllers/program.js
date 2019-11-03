const mongoose = require('mongoose'); 
const programModel = require('../models/program');

const passport = require('../passport');

module.exports.create = function( req, res) {
    if (!req.body.Program) {
        return res.status(500).send("no program defined");
    }
    var program = new programModel(req.body.Program);
    program.UserID = req.user._id;
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
    console.log('yo')
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

    programModel.find({UserID: req.user._id}, function(err, doc) {
        if (err) {
            console.log(error)
            res.status(500).send(error);
        }
        res.status(200).send(doc);

    })

} 


module.exports.update = function (req , res) {
    if (!req.body.Program) {
        return res.status(500).send("no program defined");
    }
    programModel.updateOne({_id: req.body.Program._id}, req.body.Program, function(err,raw) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(raw);
        }
    });


}


/* 
programsArray = async function(req) {
    if (req._passport.session) {
        var id = req._passport.session.user;
        const program = mongoose.model('program');
        const docs = await program.find({userID: id});
        return docs;
    } else {
        return [];
    }
}
getprogram = async function (id) {
    const program = mongoose.model('program');
    const doc = await program.find({_id: id})
    return doc[0]
}

module.exports.getWorkout = async function (req , res) {
    const docget = await getprogram(req.params.id);
    res.render('program/add_exercise' , {
        title: "add exercise page",
        id: req.params.id,
        doc: docget
    })
}

module.exports.addExercise = async function(req , res) {
    if (req._passport.session) {
        const program = mongoose.model('program');
        const docget = await getprogram(req.body.id);
    
        docget.Exercise.push(req.body.exercise);
        docget.Description.push(req.body.description);
        docget.Set.push (req.body.set);
        docget.Reps.push(req.body.repsOrTime);
        
    
        docget.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
    
    } else {
        res.redirect('/')
    }


}

module.exports.submitNewProgram  = function (req, res) {
    if (req._passport.session) {
        const program = mongoose.model('program');
        const myProgram = new program();
        myProgram.Program = req.body.program;
        myProgram.userID = req._passport.session.user;
        myProgram.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
        res.redirect('./program');

    } else {
        res.redirect('/login')
    }

} */