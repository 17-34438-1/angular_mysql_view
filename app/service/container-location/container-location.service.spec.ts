import { TestBed } from '@angular/core/testing';

import { ContainerLocationService } from './container-location.service';

describe('ContainerLocationService', () => {
  let service: ContainerLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
