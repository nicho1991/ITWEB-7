import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Program } from 'src/app/models/program';

@Component({
  selector: 'app-workout-programs',
  templateUrl: './workout-programs.component.html',
  styleUrls: ['./workout-programs.component.css']
})
export class WorkoutProgramsComponent implements OnInit {
  public programName = '';

  constructor(private apiService: ApiService) { 

  }

  ngOnInit() {
  }

  public add() {
    console.log(this.programName);
    const program = new Program();
    program.programName = this.programName;
    this.apiService.addProgram(program).subscribe(res => {
      console.log(res);
    })
  }

}
