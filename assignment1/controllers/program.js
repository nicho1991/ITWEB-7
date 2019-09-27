const mongoose = require('mongoose'); 

module.exports.index  = function (req, res) {
    res.render('program/index' , { 
        title: 'Workout Programs Page',
        programs: programsArray()
    });
}

//const programsArray = ["test"];

programsArray = function() {
    const program = mongoose.model('program');
    const myProgram = new program();

    myProgram.find({},(err, docs) => {
        return docs.program;
    });
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