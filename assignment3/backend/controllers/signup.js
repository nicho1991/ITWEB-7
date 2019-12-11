var User = require('../models/user.js');

module.exports.submit  = function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    //check fejl her
    if(name.length < 1){
    console.log('Fejl i navn')
    res.status(400).send('fejl');
}

    else{
        var newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        User.createUser(newUser, function(err, user){
            if(err) {
                res.status(500).send(err);
            };
        });
        res.status(200).send('OK');
       
       
    }
}
