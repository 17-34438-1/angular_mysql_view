import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNotStrippedAssignmentDeliveryContainersReportComponent } from './list-of-not-stripped-assignment-delivery-containers-report.component';

describe('ListOfNotStrippedAssignmentDeliveryContainersReportComponent', () => {
  let component: ListOfNotStrippedAssignmentDeliveryContainersReportComponent;
  let fixture: ComponentFixture<ListOfNotStrippedAssignmentDeliveryContainersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfNotStrippedAssignmentDeliveryContainersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfNotStrippedAssignmentDeliveryContainersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
