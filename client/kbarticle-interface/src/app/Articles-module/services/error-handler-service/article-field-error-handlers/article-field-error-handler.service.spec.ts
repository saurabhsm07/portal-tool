import { TestBed } from '@angular/core/testing';

import { ArticleFieldErrorHandlerService } from './article-field-error-handler.service';

describe('ArticleFieldErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleFieldErrorHandlerService = TestBed.get(ArticleFieldErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
