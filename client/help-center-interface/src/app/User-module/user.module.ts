import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpcenterModule } from './../Helpcenter-module/helpcenter.module';
import { UserDashboardHeaderComponent } from './components/user-dashboard-header/user-dashboard-header.component';
 


@NgModule({
  declarations: [UserDashboardHeaderComponent],
  imports: [
    CommonModule,
    HelpcenterModule,
  ],
  exports:[UserDashboardHeaderComponent]
})
export class UserModule { }
