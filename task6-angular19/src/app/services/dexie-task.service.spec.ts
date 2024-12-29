import { TestBed } from '@angular/core/testing';

import { DexieTaskService } from './dexie-task.service';

describe('DexieTaskService', () => {
  let service: DexieTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
