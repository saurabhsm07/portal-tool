import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../helpers/authentication/auth.guard';
import { AdminGuard } from './../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from './../../helpers/autherization/agent/agent.guard'

import { UserProfileComponent } from './../components/user-profile/user-profile.component'
import { UserProjectsComponent } from './../components/user-projects/user-projects.component'
import { UserEntitlementsComponent } from './../components/user-entitlements/user-entitlements.component'
import { UserSubscriptionsComponent } from './../components/user-subscriptions/user-subscriptions.component';
import { UserOverviewComponent } from './../components/user-overview/user-overview.component';
import { UserPasswordChangeComponent } from './../components/user-password-change/user-password-change.component';

const userRoutes: Routes = [
  { path: 'hc/en-us/user/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/entitlements', component: UserEntitlementsComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/projects', component: UserProjectsComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/overview', component: UserOverviewComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/subscriptions', component: UserSubscriptionsComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/user/password/change', component: UserPasswordChangeComponent, canActivate: [AuthGuard]},
  

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }