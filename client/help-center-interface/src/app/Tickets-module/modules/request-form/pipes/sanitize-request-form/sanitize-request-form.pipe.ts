import { DomSanitizer } from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeRequestForm'
})
export class SanitizeRequestFormPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
