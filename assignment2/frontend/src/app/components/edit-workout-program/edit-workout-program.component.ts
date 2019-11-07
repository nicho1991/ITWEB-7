import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'edit-workout-program',
  templateUrl: './edit-workout-program.component.html',
  styleUrls: ['./edit-workout-program.component.css']
})

export class EditWorkoutProgramComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('resetWorkoutProgramForm', { static: false }) myNgForm;

  workoutProgramForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private workoutProgramApi: ApiService
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.workoutProgramApi.GetWorkoutProgram(id).subscribe(data => {
      this.workoutProgramForm = this.fb.group({
        workoutProgramName: [data.workoutProgramName, [Validators.required]]
      });
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  /* Reactive form */
  updateForm() {
    this.workoutProgramForm = this.fb.group({
      workoutProgramName: ['', [Validators.required]]
    });
  }

  /* Update */
  updateWorkoutProgramForm() {
    console.log('DEBUG 1: ' + this.workoutProgramForm.value);
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log('DEBUG 2: ' + id);
    if (window.confirm('Are you sure you want to update?')) {
      this.workoutProgramApi.UpdateWorkoutProgram(id, this.workoutProgramForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/workout-programs-list'));
      });
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.workoutProgramForm.controls[controlName].hasError(errorName);
  }
}
