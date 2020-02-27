import { Pipe, PipeTransform } from '@angular/core';
import { Article_Form } from '../../classes/article_form';

@Pipe({
  name: 'searchArticleForm'
})
export class SearchArticleFormPipe implements PipeTransform {

  transform(value: any, searchString?: string, articleForms?: Article_Form[]): any {

    value.data = articleForms;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = articleForms.filter((form) => { if(form.name.toLowerCase().includes(searchString.toLowerCase())) {
          return form;
        }});
        return value;
      }
  }
}
