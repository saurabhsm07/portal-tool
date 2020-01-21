import { TestBed } from '@angular/core/testing';

import { ArticleFormsService } from './article-forms.service';

describe('ArticleFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleFormsService = TestBed.get(ArticleFormsService);
    expect(service).toBeTruthy();
  });
});
