import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClassBroadcastComponent } from './live-class-broadcast.component';

describe('LiveClassBroadcastComponent', () => {
  let component: LiveClassBroadcastComponent;
  let fixture: ComponentFixture<LiveClassBroadcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveClassBroadcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClassBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
