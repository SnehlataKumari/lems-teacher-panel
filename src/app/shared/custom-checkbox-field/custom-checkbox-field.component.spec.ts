import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxFieldComponent } from './custom-checkbox-field.component';

describe('CustomCheckboxFieldComponent', () => {
  let component: CustomCheckboxFieldComponent;
  let fixture: ComponentFixture<CustomCheckboxFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCheckboxFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCheckboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
