import { TestBed } from '@angular/core/testing';

import { ArticleAttachmentsService } from './article-attachments.service';

describe('ArticleAttachmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleAttachmentsService = TestBed.get(ArticleAttachmentsService);
    expect(service).toBeTruthy();
  });
});
