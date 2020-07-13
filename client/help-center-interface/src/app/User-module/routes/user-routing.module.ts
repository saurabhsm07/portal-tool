import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { AdminGuard } from '../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from '../../helpers/autherization/agent/agent.guard'

import { UserProfileComponent } from './../components/user-profile/user-profile.component';
import { UserProjectsComponent } from './../components/user-projects/user-projects.component';
import { UserEntitlementsComponent } from './../components/user-entitlements/user-entitlements.component';

const userRoutes: Routes = [
  { path: 'hc/en-us/user/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/entitlements', component: UserEntitlementsComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/projects', component: UserProjectsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }