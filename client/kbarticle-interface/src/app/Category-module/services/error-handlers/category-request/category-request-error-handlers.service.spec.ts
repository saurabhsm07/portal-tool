import { TestBed } from '@angular/core/testing';

import { CategoryRequestErrorHandlersService } from './category-request-error-handlers.service';

describe('CategoryRequestErrorHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryRequestErrorHandlersService = TestBed.get(CategoryRequestErrorHandlersService);
    expect(service).toBeTruthy();
  });
});
