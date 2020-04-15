import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from '../../services/ticket-service/ticket.service';
import { Comment} from './../../classes/comment';
@Component({
  selector: 'app-list-ticket-comments',
  templateUrl: './list-ticket-comments.component.html',
  styleUrls: ['./list-ticket-comments.component.scss']
})
export class ListTicketCommentsComponent implements OnInit {

  @Input() ticket_id: number
  public comments: Comment[];
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    console.log(`in ticket comments: ${this.ticket_id}`)
    this.getTicketComments();
  }


  /**
   * Method calls the listComments
   * method of ticketService to get all comments for selected ticket id 
   */
  public getTicketComments() {
    this.ticketService.listComments(this.ticket_id)
                      .subscribe((data) => {
                        console.log(data)
                        this.comments = data;
                        }, (error) => {
                          console.log(error)
                        });
  }
}
