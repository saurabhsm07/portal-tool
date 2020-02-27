import { Pipe, PipeTransform } from '@angular/core';
import { Section } from '../../classes/section';


@Pipe({
  name: 'searchSection'
})
export class SearchSectionPipe implements PipeTransform {


  transform(value: any, searchString?: string, sections?: Section[]): any {
    value.data = sections;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = sections.filter((section) => { if(section.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
          return section;
        }});
        return value;
      }
  }

}
