import { TestBed } from '@angular/core/testing';

import { ManagePopupsService } from './manage-popups.service';

describe('ManagePopupsService', () => {
  let service: ManagePopupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePopupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
