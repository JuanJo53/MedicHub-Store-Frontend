import { TestBed } from '@angular/core/testing';

import { SubsidiariesService } from './subsidiaries.service';

describe('SubsidiariesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubsidiariesService = TestBed.get(SubsidiariesService);
    expect(service).toBeTruthy();
  });
});
