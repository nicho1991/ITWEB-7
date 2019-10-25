import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProgramsComponent } from './workout-programs.component';

describe('WorkoutProgramsComponent', () => {
  let component: WorkoutProgramsComponent;
  let fixture: ComponentFixture<WorkoutProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
