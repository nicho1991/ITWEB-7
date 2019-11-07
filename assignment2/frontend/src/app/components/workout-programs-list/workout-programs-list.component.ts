import { WorkoutProgram } from './../../shared/workout-program';
import { Exercise } from './../../shared/exercise';
import { ApiService } from './../../shared/api.service';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-workout-programs-list',
  templateUrl: './workout-programs-list.component.html',
  styleUrls: ['./workout-programs-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class WorkoutProgramsListComponent {
  displayedColumns: string[] = ['workoutProgramName', 'action'];
  exercisesDisplayedColumns: string[] = ['Exercise', 'Description', 'Set', 'Reps'];

  WorkoutProgramData: any = [];
  dataSource: MatTableDataSource<WorkoutProgram>;

  expandedElement: WorkoutProgram;

  ExerciseData: any = [];
  exercisesDataSource: MatTableDataSource<Exercise>;

  constructor(private workoutProgramApi: ApiService) {
    this.workoutProgramApi.GetWorkoutPrograms().subscribe((data: any[]) => {

      // fill in data
      this.workoutProgramApi.getExercises().subscribe((res: any[] ) => {
        res.forEach(exID => {
          data.forEach((program, idProgram) => {
            program.Exercises.forEach((Exercise, idEx) => {
              const EX = res.find(x => x._id === Exercise);
              data[idProgram].Exercises[idEx] = EX;
            });
          });
        });
      });
      this.WorkoutProgramData = data;

      console.log(data);

      this.dataSource = new MatTableDataSource<WorkoutProgram>(this.WorkoutProgramData);
    });
  }

  deleteWorkoutProgram(e: any) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      let index = -1;
      for (const [i, v] of data.entries()) {
        if (v.workoutProgramName === e.workoutProgramName) { index = i; }
      }
      data.splice(index, 1);
      this.dataSource.data = data;
      this.workoutProgramApi.DeleteWorkoutProgram(e._id).subscribe();
    }
  }

  // EXERCISES (for selected workout program)
  getExercises(selectedElement: any) {
    this.expandedElement = this.expandedElement === selectedElement.Exercises ? null : selectedElement.Exercises;
    this.ExerciseData = this.expandedElement;

    this.exercisesDataSource = new MatTableDataSource<Exercise>(this.ExerciseData);
  }

  addExercise() {
    this.ExerciseData.push({
      exerciseName: '<placeholder>',
      description: '<placeholder>',
      set: 0,
      repsTime: '<placeholder>'
    });
    this.exercisesDataSource = new MatTableDataSource<Exercise>(this.ExerciseData);

    // TODO: If it was added successful, then add it to the database also.
  }

  editExercise(element) {
    console.log(element);
    console.log('NOT YET IMPLEMENTED!');
  }

  deleteExercise(i: number) {
    this.ExerciseData.splice(i, 1);
    this.exercisesDataSource = new MatTableDataSource<Exercise>(this.ExerciseData);

    // TODO: If it was deleted successful, then remove it from the database also.
  }

  // DEBUG
  debug(data: any) {
    console.log('****** DEBUG ******');
    console.log(data);
    console.log('');
  }
}
