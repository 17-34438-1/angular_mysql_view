import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHandlingPerformaceRtgTimeWiseComponent } from './equipment-handling-performace-rtg-time-wise.component';

describe('EquipmentHandlingPerformaceRtgTimeWiseComponent', () => {
  let component: EquipmentHandlingPerformaceRtgTimeWiseComponent;
  let fixture: ComponentFixture<EquipmentHandlingPerformaceRtgTimeWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHandlingPerformaceRtgTimeWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHandlingPerformaceRtgTimeWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
