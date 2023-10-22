import { TestBed } from '@angular/core/testing';

import { IgmContainerListService } from './igm-container-list.service';

describe('IgmContainerListService', () => {
  let service: IgmContainerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgmContainerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
