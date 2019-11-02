import { WorkoutProgram } from './../../shared/workout-program';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-workout-programs-list',
  templateUrl: './workout-programs-list.component.html',
  styleUrls: ['./workout-programs-list.component.css']
})
export class WorkoutProgramsListComponent implements OnInit {
  WorkoutProgramData: any = [];
  dataSource: MatTableDataSource<WorkoutProgram>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'workoutProgramName', 'action'];

  constructor(private workoutProgramApi: ApiService) {
    this.workoutProgramApi.GetWorkoutPrograms().subscribe(data => {
      this.WorkoutProgramData = data;
      this.dataSource = new MatTableDataSource<WorkoutProgram>(this.WorkoutProgramData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {
  }

  deleteWorkoutProgram(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.workoutProgramApi.DeleteWorkoutProgram(e._id).subscribe();
    }
  }
}
