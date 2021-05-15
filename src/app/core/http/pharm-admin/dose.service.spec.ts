import { TestBed } from '@angular/core/testing';

import { DoseService } from './dose.service';

describe('DoseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoseService = TestBed.get(DoseService);
    expect(service).toBeTruthy();
  });
});
