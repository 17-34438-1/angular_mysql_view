import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiseReSlotLocationReportComponent } from './appraise-re-slot-location-report.component';

describe('AppraiseReSlotLocationReportComponent', () => {
  let component: AppraiseReSlotLocationReportComponent;
  let fixture: ComponentFixture<AppraiseReSlotLocationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraiseReSlotLocationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiseReSlotLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
