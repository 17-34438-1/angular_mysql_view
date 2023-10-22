import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBlankBayViewReportComponent } from './export-blank-bay-view-report.component';

describe('ExportBlankBayViewReportComponent', () => {
  let component: ExportBlankBayViewReportComponent;
  let fixture: ComponentFixture<ExportBlankBayViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportBlankBayViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBlankBayViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
