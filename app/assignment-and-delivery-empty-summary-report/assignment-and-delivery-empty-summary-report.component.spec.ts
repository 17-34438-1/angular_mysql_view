import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAndDeliveryEmptySummaryReportComponent } from './assignment-and-delivery-empty-summary-report.component';

describe('AssignmentAndDeliveryEmptySummaryReportComponent', () => {
  let component: AssignmentAndDeliveryEmptySummaryReportComponent;
  let fixture: ComponentFixture<AssignmentAndDeliveryEmptySummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentAndDeliveryEmptySummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentAndDeliveryEmptySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
