
const scoreModel = require('../models/highscore');

module.exports.create = function( req, res) {
  

  
    if (req.body.score === undefined || req.body.score === null) {
        console.log(0)
        return res.status(500).send("no score defined");
    }

   
    var score = new scoreModel({name: req.body.name, score: req.body.score});

    score.name = req.user.username;
    score.save(function(err,product) {

        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(product);
        }
    })
}
