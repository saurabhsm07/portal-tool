import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { CreateTicketComponent } from './../components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './../components/list-tickets/list-tickets.component';
import { ViewTicketComponent } from './../components/view-ticket/view-ticket.component';
const routes: Routes = [
  { path: 'hc/en-us/requests/list', component: ListTicketsComponent, canActivate: [AuthGuard] },
  { path: 'hc/en-us/tickets/create/form/id/:id', component: CreateTicketComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/request/id/:id', component: ViewTicketComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
