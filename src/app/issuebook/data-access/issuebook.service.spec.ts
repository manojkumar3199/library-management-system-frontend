import { TestBed } from '@angular/core/testing';

import { IssuebookService } from './issuebook.service';

describe('IssuebookService', () => {
  let service: IssuebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
