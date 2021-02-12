import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubtReportsComponent } from './doubt-reports.component';

describe('DoubtReportsComponent', () => {
  let component: DoubtReportsComponent;
  let fixture: ComponentFixture<DoubtReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubtReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubtReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
