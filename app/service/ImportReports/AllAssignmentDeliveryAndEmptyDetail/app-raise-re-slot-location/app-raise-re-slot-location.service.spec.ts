import { TestBed } from '@angular/core/testing';

import { AppRaiseReSlotLocationService } from './app-raise-re-slot-location.service';

describe('AppRaiseReSlotLocationService', () => {
  let service: AppRaiseReSlotLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRaiseReSlotLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
