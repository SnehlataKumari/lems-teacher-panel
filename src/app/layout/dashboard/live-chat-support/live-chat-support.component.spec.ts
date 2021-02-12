import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChatSupportComponent } from './live-chat-support.component';

describe('LiveChatSupportComponent', () => {
  let component: LiveChatSupportComponent;
  let fixture: ComponentFixture<LiveChatSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveChatSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChatSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
