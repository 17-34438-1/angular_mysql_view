import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAssignmentGcbReportComponent } from './mis-assignment-gcb-report.component';

describe('MisAssignmentGcbReportComponent', () => {
  let component: MisAssignmentGcbReportComponent;
  let fixture: ComponentFixture<MisAssignmentGcbReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAssignmentGcbReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAssignmentGcbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
