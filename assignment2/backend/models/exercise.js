const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

//Define a schema
const ExerciseSchema = new Schema({
    // ExerciseId: Schema.ObjectId,
    userID: String, // Do we actually need the userID here? Wouldn't it be sufficient to only have it on the program??? 
    exerciseName: String,
    description: String,
    set: Number,
    repsTime: String,
});

const exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = exercise;