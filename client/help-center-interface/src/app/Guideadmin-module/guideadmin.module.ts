import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GuideRoutingModule } from './routes/guide-routing.module';
import { GuideadminHomeComponent } from './components/guideadmin-home/guideadmin-home.component';


@NgModule({
  declarations: [MainHeaderComponent, SidebarComponent, GuideadminHomeComponent],
  imports: [
    CommonModule,
    GuideRoutingModule
  ],
  exports: [MainHeaderComponent, SidebarComponent]
})
export class GuideadminModule { }
