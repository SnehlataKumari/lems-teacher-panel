import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiveClassDetailsComponent } from './view-live-class-details.component';

describe('ViewLiveClassDetailsComponent', () => {
  let component: ViewLiveClassDetailsComponent;
  let fixture: ComponentFixture<ViewLiveClassDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLiveClassDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLiveClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
