import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssignmentDeliveryAndEmptyDetailParentComponent } from './all-assignment-delivery-and-empty-detail-parent.component';

describe('AllAssignmentDeliveryAndEmptyDetailParentComponent', () => {
  let component: AllAssignmentDeliveryAndEmptyDetailParentComponent;
  let fixture: ComponentFixture<AllAssignmentDeliveryAndEmptyDetailParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAssignmentDeliveryAndEmptyDetailParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAssignmentDeliveryAndEmptyDetailParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
