module.exports.index  = function (req, res) {
    res.render('signup/index' , { title: 'fitnessAPP' });
}

module.exports.submit  = function (req, res) {
    console.log('submitted signup')
    res.redirect('/');
}


