import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../classes/category';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(value: any, searchString?: string, categories?: Category[]): any {
    value.data = categories;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = categories.filter((category) => { if(category.name.includes(searchString)) {
          return category;
        }});
        return value;
      }
  }

}
