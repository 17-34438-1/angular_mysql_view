import { TestBed } from '@angular/core/testing';

import { AssignmentAndDeliveryEmptySummaryService } from './assignment-and-delivery-empty-summary.service';

describe('AssignmentAndDeliveryEmptySummaryService', () => {
  let service: AssignmentAndDeliveryEmptySummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentAndDeliveryEmptySummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
