import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './routes/section-routing.module';
import { SectionHomeComponent } from './components/section-home/section-home.component';


@NgModule({
  declarations: [SectionHomeComponent],
  imports: [
    CommonModule,
    SectionRoutingModule
  ]
})
export class SectionModule { }
