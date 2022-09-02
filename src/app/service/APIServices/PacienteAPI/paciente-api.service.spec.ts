import { TestBed } from '@angular/core/testing';

import { PacienteAPIService } from './paciente-api.service';

describe('PacienteAPIService', () => {
  let service: PacienteAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
