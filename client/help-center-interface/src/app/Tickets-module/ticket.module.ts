import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';



@NgModule({
  declarations: [CreateTicketComponent, ListTicketsComponent, AddCommentComponent],
  imports: [
    CommonModule
  ]
})
export class TicketModule { }
