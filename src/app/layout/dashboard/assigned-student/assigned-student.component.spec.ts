import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedStudentComponent } from './assigned-student.component';

describe('AssignedStudentComponent', () => {
  let component: AssignedStudentComponent;
  let fixture: ComponentFixture<AssignedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
