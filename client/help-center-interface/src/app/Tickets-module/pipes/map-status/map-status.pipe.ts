import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapStatus'
})
export class MapStatusPipe implements PipeTransform {

  transform(value: any): any {
     const ticket_status_map = {
       0: 'New',
       1: 'Open',
       2: 'Pending',
       3: 'On-hold',
       4: 'Solved',
       5: 'Closed'
     }

     return ticket_status_map[value];
  }

}
