import { TestBed } from '@angular/core/testing';

import { PharmaciesService } from './pharmacies.service';

describe('PharmaciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmaciesService = TestBed.get(PharmaciesService);
    expect(service).toBeTruthy();
  });
});
