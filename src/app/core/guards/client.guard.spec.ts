import { TestBed, async, inject } from '@angular/core/testing';

import { ClientGuard } from './client.guard';

describe('ClientGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientGuard]
    });
  });

  it('should ...', inject([ClientGuard], (guard: ClientGuard) => {
    expect(guard).toBeTruthy();
  }));
});
