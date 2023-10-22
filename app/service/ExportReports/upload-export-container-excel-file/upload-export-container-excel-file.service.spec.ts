import { TestBed } from '@angular/core/testing';

import { UploadExportContainerExcelFileService } from './upload-export-container-excel-file.service';

describe('UploadExportContainerExcelFileService', () => {
  let service: UploadExportContainerExcelFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadExportContainerExcelFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
