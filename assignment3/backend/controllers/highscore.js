
const scoreModel = require('../models/highscore');

module.exports.create = function( req, res) {
  

  
    if (req.body.score === undefined || req.body.score === null) {
        console.log(0)
        return res.status(500).send("no score defined");
    }

   var name = req.user.name;
   console.log(req.user)
    var score = new scoreModel({name, score: req.body.score});


    score.save(function(err,product) {

        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(product);
        }
    })
}
