import { TestBed } from '@angular/core/testing';

import { AssignmentAndDeliveryEmptyDetailService } from './assignment-and-delivery-empty-detail.service';

describe('AssignmentAndDeliveryEmptyDetailService', () => {
  let service: AssignmentAndDeliveryEmptyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentAndDeliveryEmptyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
