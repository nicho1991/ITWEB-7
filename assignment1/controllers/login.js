module.exports.index  = function (req, res) {
    res.render('login/index' , { title: 'FitnessAPP' });
}

module.exports.submit  = function (req, res) {

    res.redirect('/')
}