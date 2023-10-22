import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardWiseAssignmentAndDeliveryEmptyDetailComponent } from './yard-wise-assignment-and-delivery-empty-detail.component';

describe('YardWiseAssignmentAndDeliveryEmptyDetailComponent', () => {
  let component: YardWiseAssignmentAndDeliveryEmptyDetailComponent;
  let fixture: ComponentFixture<YardWiseAssignmentAndDeliveryEmptyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YardWiseAssignmentAndDeliveryEmptyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YardWiseAssignmentAndDeliveryEmptyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
