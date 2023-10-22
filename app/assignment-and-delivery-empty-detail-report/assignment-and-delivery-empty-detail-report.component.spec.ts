import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAndDeliveryEmptyDetailReportComponent } from './assignment-and-delivery-empty-detail-report.component';

describe('AssignmentAndDeliveryEmptyDetailReportComponent', () => {
  let component: AssignmentAndDeliveryEmptyDetailReportComponent;
  let fixture: ComponentFixture<AssignmentAndDeliveryEmptyDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentAndDeliveryEmptyDetailReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentAndDeliveryEmptyDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
