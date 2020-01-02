import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSegment'
})
export class SearchSegmentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
