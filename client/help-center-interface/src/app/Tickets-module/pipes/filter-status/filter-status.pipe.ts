import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../../classes/ticket';


@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(value: any, requestStatus?: string): any {
    console.log(value)

    const statusMap = {
      any: '',
      open: [0, 1, 3],
      answered: [2],
      solved: [4,5],
    }
    if (requestStatus === 'any') {
      return value;
    } else {
        console.log(value)
        value.data = value.data.filter((ticket) => { if(statusMap[requestStatus].indexOf(ticket.status)!= -1) {
          return ticket;
        }});

        return value;
      }
  }

}
