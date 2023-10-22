import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerBayViewReportComponent } from './import-container-bay-view-report.component';

describe('ImportContainerBayViewReportComponent', () => {
  let component: ImportContainerBayViewReportComponent;
  let fixture: ComponentFixture<ImportContainerBayViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerBayViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerBayViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
