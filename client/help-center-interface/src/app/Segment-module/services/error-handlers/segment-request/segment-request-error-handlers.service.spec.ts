import { TestBed } from '@angular/core/testing';

import { SegmentRequestErrorHandlersService } from './segment-request-error-handlers.service';

describe('SegmentRequestErrorHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SegmentRequestErrorHandlersService = TestBed.get(SegmentRequestErrorHandlersService);
    expect(service).toBeTruthy();
  });
});
