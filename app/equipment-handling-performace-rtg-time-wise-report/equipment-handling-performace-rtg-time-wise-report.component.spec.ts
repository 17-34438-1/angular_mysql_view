import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHandlingPerformaceRtgTimeWiseReportComponent } from './equipment-handling-performace-rtg-time-wise-report.component';

describe('EquipmentHandlingPerformaceRtgTimeWiseReportComponent', () => {
  let component: EquipmentHandlingPerformaceRtgTimeWiseReportComponent;
  let fixture: ComponentFixture<EquipmentHandlingPerformaceRtgTimeWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHandlingPerformaceRtgTimeWiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHandlingPerformaceRtgTimeWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
