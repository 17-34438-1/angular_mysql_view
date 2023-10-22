import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardWiseAssignmentAndDeliveryEmptyDetailReportComponent } from './yard-wise-assignment-and-delivery-empty-detail-report.component';

describe('YardWiseAssignmentAndDeliveryEmptyDetailReportComponent', () => {
  let component: YardWiseAssignmentAndDeliveryEmptyDetailReportComponent;
  let fixture: ComponentFixture<YardWiseAssignmentAndDeliveryEmptyDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YardWiseAssignmentAndDeliveryEmptyDetailReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YardWiseAssignmentAndDeliveryEmptyDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
