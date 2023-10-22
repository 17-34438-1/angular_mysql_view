import { TestBed } from '@angular/core/testing';

import { FeederDischargeSummaryService } from './feeder-discharge-summary.service';

describe('FeederDischargeSummaryService', () => {
  let service: FeederDischargeSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeederDischargeSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
