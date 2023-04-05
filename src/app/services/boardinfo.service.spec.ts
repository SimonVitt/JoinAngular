import { TestBed } from '@angular/core/testing';

import { BoardinfoService } from './boardinfo.service';

describe('BoardinfoService', () => {
  let service: BoardinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
