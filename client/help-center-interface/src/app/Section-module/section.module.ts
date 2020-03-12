import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../imports/material-module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { GuideadminModule } from './../Guideadmin-module/guideadmin.module';
import { HelpcenterModule } from './../Helpcenter-module/helpcenter.module';

import { SectionRoutingModule } from './routes/section-routing.module';
import { SectionHomeComponent } from './components/section-home/section-home.component';
import { CreateSectionComponent } from './components/create-section/create-section.component';
import { EditSectionComponent } from './components/edit-section/edit-section.component';
import { ListSectionsComponent } from './components/list-sections/list-sections.component';
import { SearchSectionPipe } from './pipes/search-section/search-section.pipe';


import { ViewSectionHcComponent } from './components/view-section-hc/view-section-hc.component';
import { SectionHeaderHcComponent } from './components/section-header-hc/section-header-hc.component';


@NgModule({
  declarations: [SectionHomeComponent, 
                 CreateSectionComponent, 
                 EditSectionComponent,
                 ListSectionsComponent,
                 SearchSectionPipe,
                 ViewSectionHcComponent,
                 SectionHeaderHcComponent],
  imports: [
    CommonModule,
    SectionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GuideadminModule,
    HelpcenterModule
  ]
})
export class SectionModule { }
