import { TestBed } from '@angular/core/testing';

import { UpdateVesselForExportContainersService } from './update-vessel-for-export-containers.service';

describe('UpdateVesselForExportContainersService', () => {
  let service: UpdateVesselForExportContainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateVesselForExportContainersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
