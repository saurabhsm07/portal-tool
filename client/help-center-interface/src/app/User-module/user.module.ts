import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../imports/material-module';
import { UserRoutingModule } from './routes/user-routing.module';

import { HelpcenterModule } from '../Helpcenter-module/helpcenter.module';
import { UserDashboardHeaderComponent } from './components/user-dashboard-header/user-dashboard-header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEntitlementsComponent } from './components/user-entitlements/user-entitlements.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { UserSubscriptionsComponent } from './components/user-subscriptions/user-subscriptions.component';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { UserPasswordChangeComponent } from './components/user-password-change/user-password-change.component'; 



@NgModule({
  declarations: [
    UserDashboardHeaderComponent, 
    UserProfileComponent,
    UserEntitlementsComponent,
    UserProjectsComponent,
    UserSubscriptionsComponent,
    UserOverviewComponent,
    UserPasswordChangeComponent],
  imports: [
    CommonModule,
    HelpcenterModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[UserDashboardHeaderComponent]
})
export class UserModule { }
