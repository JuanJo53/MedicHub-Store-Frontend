import { TestBed } from '@angular/core/testing';

import { SubsidiariesFeedService } from './subsidiaries-feed.service';

describe('SubsidiariesFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubsidiariesFeedService = TestBed.get(SubsidiariesFeedService);
    expect(service).toBeTruthy();
  });
});
