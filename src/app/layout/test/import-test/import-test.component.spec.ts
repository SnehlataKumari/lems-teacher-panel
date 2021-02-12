import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTestComponent } from './import-test.component';

describe('ImportTestComponent', () => {
  let component: ImportTestComponent;
  let fixture: ComponentFixture<ImportTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
