import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../../classes/ticket';

@Pipe({
  name: 'searchTicket'
})
export class SearchTicketPipe implements PipeTransform {

  transform(value: any, searchString?: string, tickets?: Ticket[], requestStatus?: string): any {
    value.data = tickets;

    const statusMap = {
      any: '',
      open: [0, 1, 3],
      answered: [2],
      solved: [4,5],
    }

    if ((searchString.length === 0) && (requestStatus === "any")) {
      return value;
    }
    else if((searchString.length === 0) && (requestStatus !== "any")){
      value.data = tickets.filter((ticket) => { 
            if(statusMap[requestStatus].indexOf(ticket.status)!= -1){
              return ticket;
            }
        });
       return value; 
    } 
    else {
        console.log(tickets)
        value.data = tickets.filter((ticket) => { 
            
              if(requestStatus == 'any'){
                if(ticket.subject.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
                return ticket;
                }
              }else{
                if(statusMap[requestStatus].indexOf(ticket.status)!= -1){
                  if(ticket.subject.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
                  return ticket;
                  }
                }
              }
          
        });
        return value;
      }
  }

}
