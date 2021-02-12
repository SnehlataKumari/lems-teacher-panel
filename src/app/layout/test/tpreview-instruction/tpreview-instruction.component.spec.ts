import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpreviewInstructionComponent } from './tpreview-instruction.component';

describe('TpreviewInstructionComponent', () => {
  let component: TpreviewInstructionComponent;
  let fixture: ComponentFixture<TpreviewInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpreviewInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpreviewInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
