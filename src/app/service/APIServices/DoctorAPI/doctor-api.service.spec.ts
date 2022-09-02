import { TestBed } from '@angular/core/testing';

import { DoctorAPIService } from './doctor-api.service';

describe('DoctorAPIService', () => {
  let service: DoctorAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
