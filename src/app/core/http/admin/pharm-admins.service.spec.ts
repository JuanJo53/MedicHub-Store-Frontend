import { TestBed } from '@angular/core/testing';

import { PharmAdminsService } from './pharm-admins.service';

describe('PharmAdminsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmAdminsService = TestBed.get(PharmAdminsService);
    expect(service).toBeTruthy();
  });
});
