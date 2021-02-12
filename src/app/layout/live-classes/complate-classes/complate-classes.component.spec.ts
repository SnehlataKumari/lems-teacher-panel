import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplateClassesComponent } from './complate-classes.component';

describe('ComplateClassesComponent', () => {
  let component: ComplateClassesComponent;
  let fixture: ComponentFixture<ComplateClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplateClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplateClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
