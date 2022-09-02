import { TestBed } from '@angular/core/testing';

import { MetodoDeContactoAPIService } from './metodo-de-contacto-api.service';

describe('MetodoDeContactoAPIService', () => {
  let service: MetodoDeContactoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoDeContactoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
