import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ticket } from './../../classes/ticket';
import { TicketService } from './../../services/ticket-service/ticket.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {

  public ticket$: Observable<Ticket>; // observable to map ticket i.d from angular route path and call get category by id API
  public ticket: Ticket; // object of type ticket to store ticket data
  

  constructor(private router: Router,
              private ticketService: TicketService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit() {
    this.ticket$ = this.route.paramMap.pipe(
                  switchMap((params: ParamMap) => 
  this.ticketService.getTicketById(parseInt(params.get('id')))
    )
  );

    this.ticket$.subscribe((data) => {
      this.ticket = data
      console.log(this.ticket.requester_name)
    },(error) => {
      console.log(error)
    })
  }

  /**
   *  returns ticket id for the current ticket
   */
  public getTicketId(){
    return this.ticket.id
  }

}
