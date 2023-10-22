import { TestBed } from '@angular/core/testing';

import { ContainerSearchService } from './container-search.service';

describe('ContainerSearchService', () => {
  let service: ContainerSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
