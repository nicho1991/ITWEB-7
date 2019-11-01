import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWorkoutProgramComponent } from './components/add-workout-program/add-workout-program.component';
import { EditWorkoutProgramComponent } from './components/edit-workout-program/edit-workout-program.component';
import { WorkoutProgramsListComponent } from './components/workout-programs-list/workout-programs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWorkoutProgramComponent,
    EditWorkoutProgramComponent,
    WorkoutProgramsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
