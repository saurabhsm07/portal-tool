import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketRoutingModule} from './routes/ticket-routing.module';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { TicketRequestHeaderComponent } from './components/ticket-request-header/ticket-request-header.component';
import { HelpcenterModule } from '../Helpcenter-module/helpcenter.module';
import { MaterialModule } from '../imports/material-module';
import { RequestFormModule } from './modules/request-form/request-form.module';
import { SearchTicketPipe } from './pipes/search-ticket/search-ticket.pipe';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { ListTicketCommentsComponent } from './components/list-ticket-comments/list-ticket-comments.component';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';
import { MapStatusPipe } from './pipes/map-status/map-status.pipe';
import { MapPriorityPipe } from './pipes/map-priority/map-priority.pipe';



@NgModule({
  declarations: [CreateTicketComponent, ListTicketsComponent, AddCommentComponent, TicketRequestHeaderComponent, SearchTicketPipe, ViewTicketComponent, ListTicketCommentsComponent, TicketInfoComponent, MapStatusPipe, MapPriorityPipe],
  imports: [
    CommonModule,
    RequestFormModule,
    TicketRoutingModule,
    HelpcenterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TicketModule { }
