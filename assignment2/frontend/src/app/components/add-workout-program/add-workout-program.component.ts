import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-workout-program',
  templateUrl: './add-workout-program.component.html',
  styleUrls: ['./add-workout-program.component.css']
})
export class AddWorkoutProgramComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('resetWorkoutProgramForm', { static: true }) myNgForm;

  workoutProgramForm: FormGroup;
  exercisesArray: Subject[] = [];
  userIDArray: any = ['A', 'B', 'C'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private workoutProgramApi: ApiService
  ) { }

  ngOnInit() {
    this.submitForm();
  }

  /* Reactive form */
  submitForm() {
    this.workoutProgramForm = this.fb.group({
      workoutProgramName: ['', [Validators.required]],
      // userID: ['', [Validators.required]],
      // exercises: [this.exercisesArray],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.workoutProgramForm.controls[controlName].hasError(errorName);
  }

  /* Submit */
  submitWorkoutProgramForm() {
    // console.log(this.workoutProgramForm.status);
    if (this.workoutProgramForm.valid) {
 
      this.workoutProgramApi.AddWorkoutProgram(this.workoutProgramForm.value).subscribe(res => {
        this.router.navigate(['/workout-programs-list']);
      });
    }
  }
}
