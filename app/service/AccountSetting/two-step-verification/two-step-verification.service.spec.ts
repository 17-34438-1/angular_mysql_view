import { TestBed } from '@angular/core/testing';

import { TwoStepVerificationService } from './two-step-verification.service';

describe('TwoStepVerificationService', () => {
  let service: TwoStepVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoStepVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
