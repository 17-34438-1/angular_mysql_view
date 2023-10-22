import { TestBed } from '@angular/core/testing';

import { ViewIgmGeneralService } from './view-igm-general.service';

describe('ViewIgmGeneralService', () => {
  let service: ViewIgmGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewIgmGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
