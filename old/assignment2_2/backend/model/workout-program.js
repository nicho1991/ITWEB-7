const mongoose = require('mongoose');
const ExerciseModel = require('./exercise');
const Schema = mongoose.Schema;

module.exports = mongoose.model('WorkoutProgram', new Schema({
		workoutProgramName: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			trim: true
		},
		userID: String,	// Think we need to link this up to a real user (String -> ObjectID of user)!?
		exercises: {
			type: Array,
			ref: ExerciseModel
		},
		// exercises: [String] // This should probably be linked up to a exercise model, guess it could be an array of "Exercise Models"!?
	}), 'workout-programs' // Name of the collection in the database.
);
