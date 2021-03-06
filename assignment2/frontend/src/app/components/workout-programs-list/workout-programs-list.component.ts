import { WorkoutProgram } from './../../shared/workout-program';
import { Exercise } from './../../shared/exercise';
import { ApiService } from './../../shared/api.service';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';

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
  exercisesDisplayedColumns: string[] = ['exerciseName', 'description', 'set', 'repsTime'];

  WorkoutProgramData: any = [];
  dataSource: MatTableDataSource<WorkoutProgram>;

  expandedElement: WorkoutProgram;

  ExerciseData: any = [];
  exercisesDataSource: MatTableDataSource<Exercise>;

  constructor(private workoutProgramApi: ApiService) {
    this.update();
  }

  // EXERCISES (for selected workout program)
  async getExercises(selectedElement: any) {
    // await this.populateExerciseData(selectedElement.exercises);

    this.expandedElement = this.expandedElement === selectedElement.exercises ? selectedElement.exercises : selectedElement.exercises;

    this.ExerciseData = this.expandedElement;
    this.exercisesDataSource = new MatTableDataSource<Exercise>(this.ExerciseData);
  }

  addExercise(e: any) {


    const ex = {
      exerciseName: '<placeholder>',
      description: '<placeholder>',
      set: 0,
      repsTime: '<placeholder>'
    }   
    this.ExerciseData.push(ex);


    console.log(e)

    this.workoutProgramApi
      .addExercise(e._id ,ex).subscribe(res => {

     
        this.update();

        
        this.exercisesDataSource = new MatTableDataSource<Exercise>(this.ExerciseData);
      });

    // TODO: If it was added successful, then add it to the database also.
  }

  editExercise(element) {
    this.workoutProgramApi.editExercise(element).subscribe(res =>  {
      console.log(res)
      if ( res) {
        this.update();
      }
    });

  }

  deleteExercise(element: any) {
    const program = this.WorkoutProgramData.find(x => x.exercises.find(x => x._id)); 
    const ex = this.ExerciseData.filter(x => x._id === element._id);
    this.ExerciseData = this.ExerciseData.filter(x => x._id !== element._id);

    this.exercisesDataSource = new MatTableDataSource<Exercise>(this.ExerciseData);
    // TODO: If it was deleted successful, then remove it from the database also.

    // this.workoutProgramApi.DeleteWorkoutProgram(element.)



    this.workoutProgramApi.DeleteExercise(program._id , ex[0]).subscribe(res => {
      this.update();
    });
  }

  // WORKOUT PROGRAM
  deleteWorkoutProgram(e: any) {
    console.log(e);
    if (window.confirm('Are you sure')) {
      this.workoutProgramApi.DeleteWorkoutProgram(e._id).subscribe();
      const data = this.dataSource.data;
      let index = 1;
      for (const [i, v] of data.entries()) {
        if (v.workoutProgramName === e.workoutProgramName) { index = i; }
      }

      data.splice(index - 1, 1);
      this.dataSource.data = data;
      this.update();
    }
  }

  // DEBUG
  debug(data: any) {
    console.log('****** DEBUG ******');
    console.log(data);
    console.log('');
  }

  update() {
    this.workoutProgramApi.GetWorkoutPrograms().subscribe((data: any[]) => {
      this.workoutProgramApi.getExercises().subscribe((res: any[] ) => {
        res.forEach(exID => {
          data.forEach((program, idProgram) => {
            program.exercises.forEach((lit: any, idEx: string | number) => {
              if (lit) {
                const EX = res.find(x => x._id === lit);
                if ( EX ) {
                  data[idProgram].exercises[idEx] = EX;
                }
              }
            });
          });
        });

        this.WorkoutProgramData = data;
        this.dataSource = new MatTableDataSource<WorkoutProgram>(this.WorkoutProgramData);
      });
    });
  }
}
