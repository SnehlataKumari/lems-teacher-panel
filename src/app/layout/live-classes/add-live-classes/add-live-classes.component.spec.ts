import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiveClassesComponent } from './add-live-classes.component';

describe('AddLiveClassesComponent', () => {
  let component: AddLiveClassesComponent;
  let fixture: ComponentFixture<AddLiveClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLiveClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLiveClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
