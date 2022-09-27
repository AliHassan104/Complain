import { TestBed } from '@angular/core/testing';

import { WatertimingService } from './watertiming.service';

describe('WatertimingService', () => {
  let service: WatertimingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatertimingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
