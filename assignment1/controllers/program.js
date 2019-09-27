const mongoose = require('mongoose'); 

module.exports.index  = async function (req, res) {
    const programsget = await programsArray();

    res.render('program/index' , { 
        title: 'Workout Programs Page',
        programs: programsget
    });
}

//const programsArray = ["test"];

programsArray = async function() {


    const program = mongoose.model('program');
    const docs = await program.find();

    console.log(docs)
    return docs;
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
    console.log('hi')
    const program = mongoose.model('program');
    const myProgram = new program();
    const docget = await getprogram(req.body.id);
    console.log(req.body)

    docget.Exercise.push(req.body.exercise);
    docget.Description.push(req.body.description);
    docget.Set.push (req.body.set);
    docget.Reps.push(req.body.repsOrTime);
    

    docget.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });

    res.redirect('/')
}

module.exports.submitNewProgram  = function (req, res) {
    const program = mongoose.model('program');
    const myProgram = new program();
    myProgram.Program = req.body.program;

    myProgram.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });

    res.redirect('/')
}