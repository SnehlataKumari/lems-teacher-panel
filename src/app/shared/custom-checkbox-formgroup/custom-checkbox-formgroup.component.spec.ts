import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxFormgroupComponent } from './custom-checkbox-formgroup.component';

describe('CustomCheckboxFormgroupComponent', () => {
  let component: CustomCheckboxFormgroupComponent;
  let fixture: ComponentFixture<CustomCheckboxFormgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCheckboxFormgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCheckboxFormgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
