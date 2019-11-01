import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Custom Components */
import { AddWorkoutProgramComponent } from './components/add-workout-program/add-workout-program.component';
import { EditWorkoutProgramComponent } from './components/edit-workout-program/edit-workout-program.component';
import { WorkoutProgramsListComponent } from './components/workout-programs-list/workout-programs-list.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    AddWorkoutProgramComponent,
    EditWorkoutProgramComponent,
    WorkoutProgramsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
