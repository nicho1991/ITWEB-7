import { Injectable } from '@angular/core';

import { WorkoutProgram } from './workout-program';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {environment} from '../../environments/environment';
import { SignupDTO } from './signupDTO';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // endpoint = 'http://localhost:4000/api';
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Sign up
  SignUp(data: SignupDTO) {
    const API_URL = `${environment.apiEndpoint}/signup`;
    const object = JSON.stringify(data);

    return this.http.post(API_URL, object , {headers: this.headers, responseType: 'text'});
  }


  // Add workout-program
  AddWorkoutProgram(data: WorkoutProgram): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/add-workout-program`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all workout programs
  GetWorkoutPrograms() {
    return this.http.get(`${environment.apiEndpoint}`);
  }

  // Get workout program
  GetWorkoutProgram(id: any): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/read-workout-program/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update workout program
  UpdateWorkoutProgram(id: any, data: WorkoutProgram): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/update-workout-program/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete workout program
  DeleteWorkoutProgram(id: any): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/delete-workout-program/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
