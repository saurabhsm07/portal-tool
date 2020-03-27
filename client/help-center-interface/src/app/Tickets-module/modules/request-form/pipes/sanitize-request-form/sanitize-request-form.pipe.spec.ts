import { SanitizeRequestFormPipe } from './sanitize-request-form.pipe';

describe('SanitizeRequestFormPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeRequestFormPipe();
    expect(pipe).toBeTruthy();
  });
});
