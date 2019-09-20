

module.exports.index  = function (req, res) {
    res.render('login/index' , { title: 'fitnessAPP' });
}

module.exports.submit  = function (req, res) {
    console.log(req.body.email);


    res.redirect('/')
}