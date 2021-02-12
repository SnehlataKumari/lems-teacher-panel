import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpreviewDetailsComponent } from './tpreview-details.component';

describe('TpreviewDetailsComponent', () => {
  let component: TpreviewDetailsComponent;
  let fixture: ComponentFixture<TpreviewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpreviewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpreviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
