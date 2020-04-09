import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from './../../classes/ticket';

@Pipe({
  name: 'searchTicket'
})
export class SearchTicketPipe implements PipeTransform {

  transform(value: any, searchString?: string, tickets?: Ticket[]): any {
    value.data = tickets;
    if (searchString.length === 0) {
      return value;
    } else {
        console.log(tickets)
        value.data = tickets.filter((ticket) => { if(ticket.subject.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
          return ticket;
        }});
        return value;
      }
  }

}
