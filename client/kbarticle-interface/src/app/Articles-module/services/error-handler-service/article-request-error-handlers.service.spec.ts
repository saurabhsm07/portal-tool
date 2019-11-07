import { TestBed } from '@angular/core/testing';

import { ArticleRequestErrorHandlersService } from './article-request-error-handlers.service';

describe('ArticleRequestErrorHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleRequestErrorHandlersService = TestBed.get(ArticleRequestErrorHandlersService);
    expect(service).toBeTruthy();
  });
});
