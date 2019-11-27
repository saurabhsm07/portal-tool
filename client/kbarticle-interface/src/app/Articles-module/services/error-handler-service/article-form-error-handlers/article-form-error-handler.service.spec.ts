import { TestBed } from '@angular/core/testing';

import { ArticleFormErrorHandlerService } from './article-form-error-handler.service';

describe('ArticleFormErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleFormErrorHandlerService = TestBed.get(ArticleFormErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
