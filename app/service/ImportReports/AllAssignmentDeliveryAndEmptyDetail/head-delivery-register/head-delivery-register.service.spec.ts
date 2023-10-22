import { TestBed } from '@angular/core/testing';

import { HeadDeliveryRegisterService } from './head-delivery-register.service';

describe('HeadDeliveryRegisterService', () => {
  let service: HeadDeliveryRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadDeliveryRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
