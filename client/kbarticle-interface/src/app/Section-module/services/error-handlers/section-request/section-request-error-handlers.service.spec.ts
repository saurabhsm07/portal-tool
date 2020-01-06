import { TestBed } from '@angular/core/testing';

import { SectionRequestErrorHandlersService } from './section-request-error-handlers.service';

describe('SectionRequestErrorHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SectionRequestErrorHandlersService = TestBed.get(SectionRequestErrorHandlersService);
    expect(service).toBeTruthy();
  });
});
