import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExportContainerExcelFileComponent } from './upload-export-container-excel-file.component';

describe('UploadExportContainerExcelFileComponent', () => {
  let component: UploadExportContainerExcelFileComponent;
  let fixture: ComponentFixture<UploadExportContainerExcelFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadExportContainerExcelFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExportContainerExcelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
