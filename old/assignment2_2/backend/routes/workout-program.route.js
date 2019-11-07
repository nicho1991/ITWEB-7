const express = require('express');
const app = express();	// Don't think this is needed here? At least 'app' is apparently not used!
const workoutProgramRoute = express.Router();

// Workout program model
const WorkoutProgram = require('../model/workout-program');

// Add workout program
workoutProgramRoute.route('/add-workout-program').post((req, res, next) => {
  WorkoutProgram.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all workout programs
workoutProgramRoute.route('/').get((req, res) => {
  WorkoutProgram.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single workout program
workoutProgramRoute.route('/read-workout-program/:id').get((req, res) => {
  WorkoutProgram.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update workout program
workoutProgramRoute.route('/update-workout-program/:id').put((req, res, next) => {
  WorkoutProgram.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      console.log('Workout Program successfully updated!')
    }
  })
})

// Delete Workout program
workoutProgramRoute.route('/delete-workout-program/:id').delete((req, res, next) => {
  WorkoutProgram.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = workoutProgramRoute;