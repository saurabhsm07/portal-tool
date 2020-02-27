import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSegmentComponent } from '../components/create-segment/create-segment.component';
import { EditSegmentComponent } from '../components/edit-segment/edit-segment.component';
import { SegmentHomeComponent } from '../components/segment-home/segment-home.component';

import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { AdminGuard } from '../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from '../../helpers/autherization/agent/agent.guard'
const routes: Routes = [
  { path: 'guide/segments/home', component: SegmentHomeComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/segments/create', component: CreateSegmentComponent, canActivate: [AuthGuard, AgentGuard]},
  { path: 'guide/segments/id/:id', component: EditSegmentComponent, canActivate: [AuthGuard, AgentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentRoutingModule { }
