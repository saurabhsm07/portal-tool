import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchField'
})
export class SearchFieldPipe implements PipeTransform {

  transform(value: string, searchString?: string): string {

    if(searchString.length == 0)
      return value;
    else if(value.includes(searchString))
      return value;
    else 
      return null;
  }

}
