import { TestBed } from '@angular/core/testing';

import { RiesgoService } from './riesgo.service';

describe('RiesgoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiesgoService = TestBed.get(RiesgoService);
    expect(service).toBeTruthy();
  });
});
