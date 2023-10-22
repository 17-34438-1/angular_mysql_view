import { TestBed } from '@angular/core/testing';

import { MisAssignmentService } from './mis-assignment.service';

describe('MisAssignmentService', () => {
  let service: MisAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
