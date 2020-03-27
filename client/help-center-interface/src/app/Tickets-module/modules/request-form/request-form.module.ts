import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../imports/material-module';
import { DynamicRequestFormComponent } from './components/dynamic-request-form/dynamic-request-form.component';
import { SanitizeRequestFormPipe } from './pipes/sanitize-request-form/sanitize-request-form.pipe';



@NgModule({
  declarations: [DynamicRequestFormComponent, SanitizeRequestFormPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [DynamicRequestFormComponent]
})
export class RequestFormModule { }
