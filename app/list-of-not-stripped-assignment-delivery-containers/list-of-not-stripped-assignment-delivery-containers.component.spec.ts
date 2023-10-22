import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNotStrippedAssignmentDeliveryContainersComponent } from './list-of-not-stripped-assignment-delivery-containers.component';

describe('ListOfNotStrippedAssignmentDeliveryContainersComponent', () => {
  let component: ListOfNotStrippedAssignmentDeliveryContainersComponent;
  let fixture: ComponentFixture<ListOfNotStrippedAssignmentDeliveryContainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfNotStrippedAssignmentDeliveryContainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfNotStrippedAssignmentDeliveryContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
