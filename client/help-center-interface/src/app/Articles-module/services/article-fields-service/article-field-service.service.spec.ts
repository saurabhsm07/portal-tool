import { TestBed } from '@angular/core/testing';

import { ArticleFieldService } from './article-field-service.service';

describe('ArticleFieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleFieldService = TestBed.get(ArticleFieldService);
    expect(service).toBeTruthy();
  });
});
