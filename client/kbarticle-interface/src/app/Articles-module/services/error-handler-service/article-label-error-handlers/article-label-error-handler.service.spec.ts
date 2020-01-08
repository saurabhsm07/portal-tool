import { TestBed } from '@angular/core/testing';

import { ArticleLabelErrorHandlerService } from './article-label-error-handler.service';

describe('ArticleLabelErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleLabelErrorHandlerService = TestBed.get(ArticleLabelErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
