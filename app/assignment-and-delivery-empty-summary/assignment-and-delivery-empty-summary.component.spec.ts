import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAndDeliveryEmptySummaryComponent } from './assignment-and-delivery-empty-summary.component';

describe('AssignmentAndDeliveryEmptySummaryComponent', () => {
  let component: AssignmentAndDeliveryEmptySummaryComponent;
  let fixture: ComponentFixture<AssignmentAndDeliveryEmptySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentAndDeliveryEmptySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentAndDeliveryEmptySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
