import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpcenterRoutingModule } from './routes/helpcenter-routing.module';
import { HelpcenterHomeComponent } from './components/helpcenter-home/helpcenter-home.component';
import { HelpcenterFooterComponent } from './components/helpcenter-footer/helpcenter-footer.component';
import { HelpcenterHeaderComponent } from './components/helpcenter-header/helpcenter-header.component';


@NgModule({
  declarations: [HelpcenterHomeComponent, HelpcenterFooterComponent, HelpcenterHeaderComponent],
  exports: [HelpcenterFooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HelpcenterRoutingModule
  ]
})
export class HelpcenterModule { }