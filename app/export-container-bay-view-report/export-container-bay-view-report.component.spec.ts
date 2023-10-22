import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportContainerBayViewReportComponent } from './export-container-bay-view-report.component';

describe('ExportContainerBayViewReportComponent', () => {
  let component: ExportContainerBayViewReportComponent;
  let fixture: ComponentFixture<ExportContainerBayViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportContainerBayViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportContainerBayViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
