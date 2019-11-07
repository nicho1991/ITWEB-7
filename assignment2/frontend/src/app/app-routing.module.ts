import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutProgramsListComponent } from './components/workout-programs-list/workout-programs-list.component';
import { EditWorkoutProgramComponent } from './components/edit-workout-program/edit-workout-program.component';
import { AddWorkoutProgramComponent } from './components/add-workout-program/add-workout-program.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {AuthGuard} from './helpers/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'add-workout-program', component: AddWorkoutProgramComponent, canActivate: [AuthGuard] },
  { path: 'edit-workout-program/:id', component: EditWorkoutProgramComponent , canActivate: [AuthGuard]},
  { path: 'workout-programs-list', component: WorkoutProgramsListComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
