import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAndDeliveryEmptyDetailComponent } from './assignment-and-delivery-empty-detail.component';

describe('AssignmentAndDeliveryEmptyDetailComponent', () => {
  let component: AssignmentAndDeliveryEmptyDetailComponent;
  let fixture: ComponentFixture<AssignmentAndDeliveryEmptyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentAndDeliveryEmptyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentAndDeliveryEmptyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
