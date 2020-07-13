import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './routes/user-routing.module';

import { HelpcenterModule } from '../Helpcenter-module/helpcenter.module';
import { UserDashboardHeaderComponent } from './components/user-dashboard-header/user-dashboard-header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEntitlementsComponent } from './components/user-entitlements/user-entitlements.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component'; 


@NgModule({
  declarations: [
    UserDashboardHeaderComponent, 
    UserProfileComponent,
    UserEntitlementsComponent,
    UserProjectsComponent],
  imports: [
    CommonModule,
    HelpcenterModule,
    UserRoutingModule
  ],
  exports:[UserDashboardHeaderComponent]
})
export class UserModule { }
