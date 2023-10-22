import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDeliveryRegisterReportComponent } from './head-delivery-register-report.component';

describe('HeadDeliveryRegisterReportComponent', () => {
  let component: HeadDeliveryRegisterReportComponent;
  let fixture: ComponentFixture<HeadDeliveryRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadDeliveryRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadDeliveryRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
