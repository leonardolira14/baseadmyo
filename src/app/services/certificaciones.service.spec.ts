import { TestBed } from '@angular/core/testing';

import { CertificacionesService } from './certificaciones.service';

describe('CertificacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificacionesService = TestBed.get(CertificacionesService);
    expect(service).toBeTruthy();
  });
});
