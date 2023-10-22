import { TestBed } from '@angular/core/testing';

import { ListOfNotStrippedAssignmentDeliveryContainersService } from './list-of-not-stripped-assignment-delivery-containers.service';

describe('ListOfNotStrippedAssignmentDeliveryContainersService', () => {
  let service: ListOfNotStrippedAssignmentDeliveryContainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfNotStrippedAssignmentDeliveryContainersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
