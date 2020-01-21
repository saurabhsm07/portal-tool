import { Pipe, PipeTransform } from '@angular/core';
import { Segment } from './../../classes/segment';

@Pipe({
  name: 'searchSegment'
})
export class SearchSegmentPipe implements PipeTransform {

  transform(value: any, searchString?: string, segments?: Segment[]): any {
    value.data = segments;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = segments.filter((segment) => { if(segment.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
          return segment;
        }});
        return value;
      }
  }

}
