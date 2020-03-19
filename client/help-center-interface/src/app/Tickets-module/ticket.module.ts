import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule} from './routes/ticket-routing.module';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { TicketRequestHeaderComponent } from './components/ticket-request-header/ticket-request-header.component';
import { HelpcenterModule } from './../Helpcenter-module/helpcenter.module';
import { MaterialModule } from './../imports/material-module';
import { SanitizeRequestFormPipe } from './pipes/sanitize-request-form/sanitize-request-form.pipe';



@NgModule({
  declarations: [CreateTicketComponent, ListTicketsComponent, AddCommentComponent, TicketRequestHeaderComponent, SanitizeRequestFormPipe],
  imports: [
    CommonModule,
    TicketRoutingModule,
    HelpcenterModule,
    MaterialModule
  ]
})
export class TicketModule { }
