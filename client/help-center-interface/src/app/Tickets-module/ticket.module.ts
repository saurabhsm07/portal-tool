import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule} from './routes/ticket-routing.module';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { TicketRequestHeaderComponent } from './components/ticket-request-header/ticket-request-header.component';
import { HelpcenterModule } from './../Helpcenter-module/helpcenter.module';



@NgModule({
  declarations: [CreateTicketComponent, ListTicketsComponent, AddCommentComponent, TicketRequestHeaderComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    HelpcenterModule
  ]
})
export class TicketModule { }
