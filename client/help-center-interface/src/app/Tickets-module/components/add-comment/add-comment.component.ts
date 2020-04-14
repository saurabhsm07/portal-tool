import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from './../../services/ticket-service/ticket.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() ticket_id: number;

  constructor(private fb: FormBuilder,
              private ticketService: TicketService) { }


  ticket_comment = this.fb.control('',[])
  ngOnInit() {
    console.log(`add ticket comment : ${this.ticket_id}`);
  }

}
