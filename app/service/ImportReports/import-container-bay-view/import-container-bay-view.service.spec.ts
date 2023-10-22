import { TestBed } from '@angular/core/testing';

import { ImportContainerBayViewService } from './import-container-bay-view.service';

describe('ImportContainerBayViewService', () => {
  let service: ImportContainerBayViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportContainerBayViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
