import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { AddCommentComponent } from './../components/add-comment/add-comment.component';
import { CreateTicketComponent } from './../components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './../components/list-tickets/list-tickets.component';
const routes: Routes = [
  { path: 'hc/en-us/tickets/list', component: ListTicketsComponent, canActivate: [AuthGuard] },
  { path: 'hc/en-us/tickets/create', component: CreateTicketComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/tickets/id/:id', component: AddCommentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
