import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchField'
})
export class SearchFieldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    console.log(args)
    return null;
  }

}
