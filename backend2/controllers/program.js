const mongoose = require('mongoose'); 

module.exports.create = function( req, res) {
    console.log(req.body.length)
    if (req.body.length) {
        return res.status(400).send('content cannot be empty');
    }
}
module.exports.delete = function (req , res) {}
module.exports.getSingle = function (req , res) {}
module.exports.getAll = function (req , res) {}
module.exports.update = function (req , res) {}


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