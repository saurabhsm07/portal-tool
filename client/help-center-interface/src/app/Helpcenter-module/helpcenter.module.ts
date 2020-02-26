import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpcenterRoutingModule } from './routes/helpcenter-routing.module';
import { MaterialModule } from './../imports/material-module';

import { HelpcenterHomeComponent } from './components/helpcenter-home/helpcenter-home.component';
import { HelpcenterFooterComponent } from './components/helpcenter-footer/helpcenter-footer.component';
import { HelpcenterHeaderComponent } from './components/helpcenter-header/helpcenter-header.component';
import { ComponentNotFoundComponent } from './components/component-not-found/component-not-found.component';


@NgModule({
  declarations: [HelpcenterHomeComponent, HelpcenterFooterComponent, HelpcenterHeaderComponent, ComponentNotFoundComponent],
  exports: [HelpcenterFooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HelpcenterRoutingModule,
    MaterialModule
  ]
})
export class HelpcenterModule { }
