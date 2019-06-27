import { TestBed } from '@angular/core/testing';

import { ExecutionContextService } from './execution-context.service';

describe('ExecutionContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutionContextService = TestBed.get(ExecutionContextService);
    expect(service).toBeTruthy();
  });
});
