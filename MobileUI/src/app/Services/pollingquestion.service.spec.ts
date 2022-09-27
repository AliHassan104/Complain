import { TestBed } from '@angular/core/testing';

import { PollingquestionService } from './pollingquestion.service';

describe('PollingquestionService', () => {
  let service: PollingquestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollingquestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
