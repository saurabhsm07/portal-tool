import { SanitizeArticlePipe } from './sanitize-article.pipe';

describe('SanitizeArticlePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeArticlePipe();
    expect(pipe).toBeTruthy();
  });
});
