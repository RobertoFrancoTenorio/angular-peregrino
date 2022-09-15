import { TestBed } from '@angular/core/testing';

import { HistoriaClinicaAPIService } from './historia-clinica-api.service';

describe('HistoriaClinicaAPIService', () => {
  let service: HistoriaClinicaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriaClinicaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
