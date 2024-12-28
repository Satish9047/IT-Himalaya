import { TestBed } from '@angular/core/testing';

import { DexieServiceService } from './dexie-service.service';

describe('DexieServiceService', () => {
  let service: DexieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
