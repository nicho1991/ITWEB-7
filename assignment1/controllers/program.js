const mongoose = require('mongoose'); 
module.exports.index  = function (req, res) {
    res.render('program/index' , { title: 'Workout Programs Page' });
}

module.exports.submitNewProgram  = function (req, res) {

    const program = mongoose.model('program');

    const myProgram = new program();
    
    myProgram.program = req.body.program;


    myProgram.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });

    res.redirect('/')
}