import { TestBed } from '@angular/core/testing';

import { PassGuard } from './pass.guard';

describe('PassGuard', () => {
  let service: PassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
