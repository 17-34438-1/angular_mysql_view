import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAssignmentReportComponent } from './mis-assignment-report.component';

describe('MisAssignmentReportComponent', () => {
  let component: MisAssignmentReportComponent;
  let fixture: ComponentFixture<MisAssignmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAssignmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAssignmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
