const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

//Define a schema
const ProgramSchema = new Schema({
    ProgramId: Schema.ObjectId,
    Program: String,
    userID: String,
    exercises: [Number],
});

const program = mongoose.model('program', ProgramSchema);
module.exports = program;