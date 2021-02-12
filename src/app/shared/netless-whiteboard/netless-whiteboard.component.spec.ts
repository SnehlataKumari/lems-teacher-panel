import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetlessWhiteboardComponent } from './netless-whiteboard.component';

describe('NetlessWhiteboardComponent', () => {
  let component: NetlessWhiteboardComponent;
  let fixture: ComponentFixture<NetlessWhiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetlessWhiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetlessWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
