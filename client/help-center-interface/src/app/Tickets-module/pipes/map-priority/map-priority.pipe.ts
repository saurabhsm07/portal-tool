import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapPriority'
})
export class MapPriorityPipe implements PipeTransform {

  transform(value: any): any {
    const ticket_priority_map = {
      1: 'Urgent',
      2: 'High',
      3: 'Normal',
      4: 'Low'
    };

    return ticket_priority_map[value];

}
}
