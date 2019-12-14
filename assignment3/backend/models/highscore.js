const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

//Define a schema
const HighScoreSchema = new Schema({
    // ExerciseId: Schema.ObjectId,
    // userID: String, // Do we actually need the userID here? Wouldn't it be sufficient to only have it on the program??? 
    name: String,
  
    score: Number,

});

const score = mongoose.model('highscore', HighScoreSchema);

module.exports = score;