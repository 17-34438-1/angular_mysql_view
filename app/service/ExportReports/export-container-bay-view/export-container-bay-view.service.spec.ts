import { TestBed } from '@angular/core/testing';

import { ExportContainerBayViewService } from './export-container-bay-view.service';

describe('ExportContainerBayViewService', () => {
  let service: ExportContainerBayViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportContainerBayViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
