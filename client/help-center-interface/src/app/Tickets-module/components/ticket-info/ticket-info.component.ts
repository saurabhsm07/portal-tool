import { Component, OnInit, Input} from '@angular/core';
import { Ticket } from '../../classes/ticket';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {

  @Input() ticket: Ticket
  constructor() { }

  ngOnInit() {
    console.log("in ticket info");
    console.log(this.ticket);
  }

}
