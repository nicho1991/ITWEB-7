const mongoose = require('mongoose'); 

module.exports.index  = function (req, res) {
    res.render('login/index' , { title: 'fitnessAPP' });
}

module.exports.submit  = function (req, res) {
    console.log(req.body.email);

    const workout = mongoose.model('workout');

    const myWorkout = new workout();
    
    myWorkout.exercise = "test";


    myWorkout.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });

    res.redirect('/')
}