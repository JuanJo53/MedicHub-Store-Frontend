import { TestBed, async, inject } from '@angular/core/testing';

import { PharmAdminGuard } from './pharm-admin.guard';

describe('PharmAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharmAdminGuard]
    });
  });

  it('should ...', inject([PharmAdminGuard], (guard: PharmAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
