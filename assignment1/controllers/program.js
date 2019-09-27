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
    console.log('1')

    const program = mongoose.model('program');
    const docs = await program.find();
    console.log(docs)
    return docs;
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