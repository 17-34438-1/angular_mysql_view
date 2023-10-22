import { TestBed } from '@angular/core/testing';

import { LclTallyService } from './lcl-tally.service';

describe('LclTallyService', () => {
  let service: LclTallyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LclTallyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
