import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDeliveryRegisterGcbComponent } from './head-delivery-register-gcb.component';

describe('HeadDeliveryRegisterGcbComponent', () => {
  let component: HeadDeliveryRegisterGcbComponent;
  let fixture: ComponentFixture<HeadDeliveryRegisterGcbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadDeliveryRegisterGcbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadDeliveryRegisterGcbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
