import { TestBed } from '@angular/core/testing';

import { ArticleFieldServiceService } from './article-field-service.service';

describe('ArticleFieldServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleFieldServiceService = TestBed.get(ArticleFieldServiceService);
    expect(service).toBeTruthy();
  });
});
