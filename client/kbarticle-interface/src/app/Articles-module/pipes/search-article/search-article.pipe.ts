import { Pipe, PipeTransform } from '@angular/core';
import { Article } from './../../classes/article';

@Pipe({
  name: 'searchArticle'
})
export class SearchArticlePipe implements PipeTransform {

  transform(value: any, searchString?: string, articles?: Article[]): any {
    value.data = articles;
    if (searchString.length === 0) {
      return value;
    } else {
        value.data = articles.filter((article) => { if(article.title.includes(searchString)) {
          return article;
        }});
        return value;
      }
  }

}
