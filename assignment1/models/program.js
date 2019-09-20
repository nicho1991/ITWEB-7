const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
//Define a schema
const WorkoutSchema = new Schema({
    Id: Schema.ObjectId,
    Program: String,
    Exercise: [String],
    Description: [String],
    Set: [Number],
    Reps: [String],
});

const program = mongoose.model('program', WorkoutSchema)

module.exports = program;