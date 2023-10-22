import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LclAssignmentReportComponent } from './lcl-assignment-report.component';

describe('LclAssignmentReportComponent', () => {
  let component: LclAssignmentReportComponent;
  let fixture: ComponentFixture<LclAssignmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LclAssignmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LclAssignmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
