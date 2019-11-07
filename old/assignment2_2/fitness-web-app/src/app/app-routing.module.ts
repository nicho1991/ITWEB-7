import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutProgramsListComponent } from './components/workout-programs-list/workout-programs-list.component';
import { EditWorkoutProgramComponent } from './components/edit-workout-program/edit-workout-program.component';
import { AddWorkoutProgramComponent } from './components/add-workout-program/add-workout-program.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-workout-program' },
  { path: 'add-workout-program', component: AddWorkoutProgramComponent },
  { path: 'edit-workout-program/:id', component: EditWorkoutProgramComponent },
  { path: 'workout-programs-list', component: WorkoutProgramsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
