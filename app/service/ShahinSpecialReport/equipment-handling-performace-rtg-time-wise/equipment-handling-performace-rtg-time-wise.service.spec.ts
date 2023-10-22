import { TestBed } from '@angular/core/testing';

import { EquipmentHandlingPerformaceRtgTimeWiseService } from './equipment-handling-performace-rtg-time-wise.service';

describe('EquipmentHandlingPerformaceRtgTimeWiseService', () => {
  let service: EquipmentHandlingPerformaceRtgTimeWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentHandlingPerformaceRtgTimeWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
