import { Injectable } from '@angular/core';
import { Program } from '../models/program';
import { timeout } from 'q';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ProgramsState = new Array<Program>();
  constructor() { }

  public addProgram(program:Program): Observable<Program> {
    const x = new Subject<Program>();
    program.id = '2';
    x.next(program);
    return x.asObservable();

  }
}
