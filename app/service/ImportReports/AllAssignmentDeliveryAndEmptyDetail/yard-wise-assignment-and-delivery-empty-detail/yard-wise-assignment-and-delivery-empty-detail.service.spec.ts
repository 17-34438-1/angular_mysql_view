import { TestBed } from '@angular/core/testing';

import { YardWiseAssignmentAndDeliveryEmptyDetailService } from './yard-wise-assignment-and-delivery-empty-detail.service';

describe('YardWiseAssignmentAndDeliveryEmptyDetailService', () => {
  let service: YardWiseAssignmentAndDeliveryEmptyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YardWiseAssignmentAndDeliveryEmptyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
