import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpcenterRoutingModule } from './routes/helpcenter-routing.module';
import { HelpcenterHomeComponent } from './components/helpcenter-home/helpcenter-home.component';


@NgModule({
  declarations: [HelpcenterHomeComponent],
  imports: [
    CommonModule,
    HelpcenterRoutingModule
  ]
})
export class HelpcenterModule { }
