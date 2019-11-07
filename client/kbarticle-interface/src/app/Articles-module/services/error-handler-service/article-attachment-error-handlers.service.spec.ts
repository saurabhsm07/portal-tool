import { TestBed } from '@angular/core/testing';

import { ArticleAttachmentErrorHandlersService } from './article-attachment-error-handlers.service';

describe('ArticleAttachmentErrorHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleAttachmentErrorHandlersService = TestBed.get(ArticleAttachmentErrorHandlersService);
    expect(service).toBeTruthy();
  });
});
