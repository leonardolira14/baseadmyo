import { TestBed } from '@angular/core/testing';

import { AsociacionesService } from './asociaciones.service';

describe('AsociacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsociacionesService = TestBed.get(AsociacionesService);
    expect(service).toBeTruthy();
  });
});
