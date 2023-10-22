import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDeliveryRegisterComponent } from './head-delivery-register.component';

describe('HeadDeliveryRegisterComponent', () => {
  let component: HeadDeliveryRegisterComponent;
  let fixture: ComponentFixture<HeadDeliveryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadDeliveryRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadDeliveryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
