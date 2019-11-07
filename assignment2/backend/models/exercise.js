const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

//Define a schema
const ExerciseSchema = new Schema({
    ExerciseId: Schema.ObjectId,
    Exercise: String,
    Description: String,
    Set: Number,
    Reps: String,
});

const exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = exercise;