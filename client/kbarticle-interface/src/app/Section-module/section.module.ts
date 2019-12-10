import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../imports/material-module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionRoutingModule } from './routes/section-routing.module';
import { SectionHomeComponent } from './components/section-home/section-home.component';
import { CreateSectionComponent } from './components/create-section/create-section.component';
import { EditSectionComponent } from './components/edit-section/edit-section.component';
import { ListSectionsComponent } from './components/list-sections/list-sections.component';


@NgModule({
  declarations: [SectionHomeComponent, 
                 CreateSectionComponent, 
                 EditSectionComponent,
                 ListSectionsComponent],
  imports: [
    CommonModule,
    SectionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SectionModule { }
