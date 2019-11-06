const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Exercise', new Schema({
	exerciseName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
		trim: true
	},
	description: String,
	set: Number,
	repsTime: String
	}), 'exercises'
);
