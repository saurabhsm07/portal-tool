import { Pipe, PipeTransform } from '@angular/core';
import { Article_Label } from './../../classes/article_label';
@Pipe({
  name: 'searchArticleLabel'
})
export class SearchArticleLabelPipe implements PipeTransform {

  transform(value: any, searchString?: string, articleLabels?: Article_Label[], selectedValues?: Article_Label[]): any {

    value.data = articleLabels;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = articleLabels.filter((label) => { if(label.name.toLowerCase().includes(searchString.toLowerCase())) {
          return label;
        }});
        return value;
      }
  }
}
