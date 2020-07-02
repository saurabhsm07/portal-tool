import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket-service/ticket.service';
import { Comment } from '../../classes/comment';
import { UserService } from '../../../User-module/services/user-service/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddCommentComponent implements OnInit {

  @Input() ticket_id: number; // id of the current ticket view

  public ticket_comment: Comment; //comment object to be saved to the database
  
  constructor(private fb: FormBuilder,
              private ticketService: TicketService,
              private userService: UserService,
              private router: Router) { }


// reactive form to accept ticket comment data from user              
  comment_form = this.fb.group({
    comment_body: ['', [Validators.required]],
    ticket_attachment: [[],{disabled: true}]
  })

  get comment() {return this.comment_form.get('comment_body');}

  ngOnInit() {
    console.log(`add ticket comment : ${this.ticket_id}`);
  }

  /**
   * method is triggered when comment_form is submitted; 
   * it creates a comment object which is saved to the ticket comments database
   */
  public submitComment(){
    this.ticket_comment = {
      ticket_id: this.ticket_id,
      body: this.comment.value,
      html_body: this.comment.value,
      plain_body: this.comment.value,
      public:true,
      author_id: this.userService.getUserId(),
      via: 'web-api',
      via_data:'{via:"web-api", from: "hc-interface"}',
      created_at:new Date(Date.now()),
    }
    this.createTicketComment()
  }

  /**
   * method calls the post comment method of the ticket service that calls 'POST' ticket comment api
   */
  public createTicketComment(){
    this.ticketService.createComment(this.ticket_comment)
                      .subscribe((data) => {
                        console.log(`comment created with id: ${data.id}`);
                        this.router.navigate(['/hc/en-us/requests/list']);
                      },(error) => {
                        console.log(error);
                      })

  }

}
