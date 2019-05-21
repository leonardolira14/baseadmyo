import { TestBed } from '@angular/core/testing';

import { CalifcarService } from './califcar.service';

describe('CalifcarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalifcarService = TestBed.get(CalifcarService);
    expect(service).toBeTruthy();
  });
});
