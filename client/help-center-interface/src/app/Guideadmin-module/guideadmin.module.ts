import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GuideRoutingModule } from './routes/guide-routing.module';


@NgModule({
  declarations: [MainHeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    GuideRoutingModule
  ],
  exports: [MainHeaderComponent, SidebarComponent]
})
export class GuideadminModule { }
