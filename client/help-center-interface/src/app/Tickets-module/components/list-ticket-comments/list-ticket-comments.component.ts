import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-ticket-comments',
  templateUrl: './list-ticket-comments.component.html',
  styleUrls: ['./list-ticket-comments.component.scss']
})
export class ListTicketCommentsComponent implements OnInit {

  @Input() ticket_id: number
  constructor() { }

  ngOnInit() {
    console.log(`in ticket comments: ${this.ticket_id}`)
  }

}
