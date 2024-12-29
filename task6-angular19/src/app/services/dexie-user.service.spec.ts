import { TestBed } from '@angular/core/testing';

import { DexieUserService } from './dexie-user.service';

describe('DexieUserService', () => {
  let service: DexieUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
