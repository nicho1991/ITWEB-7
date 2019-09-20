const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
//Define a schema
const WorkoutSchema = new Schema({
    id: Schema.ObjectId,
    exercise: String,
    description: String,
    set: Date,
    reps: String,
});

const workout = mongoose.model('workout', WorkoutSchema)

module.exports = workout;