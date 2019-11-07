import { Injectable } from '@angular/core';

import { WorkoutProgram } from './workout-program';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SignupDTO } from './signupDTO';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Sign up
  SignUp(data: SignupDTO) {
    const API_URL = `${environment.apiEndpoint}/signup`;
    const object = JSON.stringify(data);

    return this.http.post(API_URL, object , {headers: this.headers, responseType: 'text'});
  }

  // Login
  Login(data: SignupDTO) {
    console.log(data);
    const API_URL = `${environment.apiEndpoint}/login`;
    const object = JSON.stringify(data);
    return this.http.post(API_URL, object , {headers: this.headers, responseType: 'text'});
  }

  // Add workout-program
  AddWorkoutProgram(data: WorkoutProgram) {
    const API_URL = `${environment.apiEndpoint}/program`;
    const data1 = JSON.stringify(data);


    return this.http.post(API_URL, data1, {headers: this.headers, responseType: 'json'});
  }

  // Get all workout programs
  GetWorkoutPrograms() {
    return this.http.get(`${environment.apiEndpoint}/program/all`);
  }

  // Get all exercises
  getExercises() {
    const API_URL = `${environment.apiEndpoint}/exercise/all`;
    return this.http.get(API_URL, {headers: this.headers, responseType: 'json'});
  }

  addExercise(id, e: any) {
    console.log(id)
    const API_URL = `${environment.apiEndpoint}/exercise?id=${id}`;

    const obj = JSON.stringify(e);
    console.log(e);
    return this.http.post(API_URL, obj, {headers: this.headers, responseType: 'text'});
  }

  // Get workout program
  GetWorkoutProgram(id: any): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/program/single/?id=${id}`;
    // return this.http.get(API_URL, { headers: this.headers }).pipe(
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update workout program
  UpdateWorkoutProgram( data: any): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/program`;
    const obj = JSON.stringify(data);

    console.log(obj);
    return this.http.put(API_URL, obj, { headers: this.headers, responseType: 'json' }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete workout program
  DeleteWorkoutProgram(id: any): Observable<any> {
    const API_URL = `${environment.apiEndpoint}/program/?id=${id}`;
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
