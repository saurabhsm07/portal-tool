import { TestBed } from '@angular/core/testing';

import { ArticleLabelsService } from './article-labels.service';

describe('ArticleLabelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleLabelsService = TestBed.get(ArticleLabelsService);
    expect(service).toBeTruthy();
  });
});
