import { Pipe, PipeTransform } from '@angular/core';
import { Field } from '../../components/create-article/field-class';
import { Article_Field } from '../../classes/article_fields';


@Pipe({
  name: 'searchField'
})
export class SearchFieldPipe implements PipeTransform {

  transform(value: any, searchString?: string, articleFields? : Article_Field[]): any {

    value.data = articleFields;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = articleFields.filter((field) => { if(field.field_name.includes(searchString)) {
          return field;
        }});
        return value;
      }
  }

}
