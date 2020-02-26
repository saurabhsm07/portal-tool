import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionHomeComponent } from './../components/section-home/section-home.component';
import { CreateSectionComponent } from './../components/create-section/create-section.component';
import { EditSectionComponent } from './../components/edit-section/edit-section.component';
import { ViewSectionHcComponent } from './../components/view-section-hc/view-section-hc.component';
import { AuthGuard } from './../../helpers/authentication/auth.guard';
import { AdminGuard } from './../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from './../../helpers/autherization/agent/agent.guard';

const routes: Routes = [
  { path: 'guide/sections/home', component: SectionHomeComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/sections/create', component: CreateSectionComponent, canActivate: [AuthGuard, AgentGuard]},
  { path: 'guide/sections/id/:id', component: EditSectionComponent, canActivate: [AuthGuard, AgentGuard]},
  { path: 'hc/en-us/sections/id/:id', component: ViewSectionHcComponent, canActivate: [AuthGuard, AgentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
