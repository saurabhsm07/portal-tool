import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../imports/material-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { EditorModule } from '@tinymce/tinymce-angular'
import { CommonModule } from '@angular/common';


import { GuideadminModule } from '../Guideadmin-module/guideadmin.module';
import { HelpcenterModule } from './../Helpcenter-module/helpcenter.module';

import { CategoryRoutingModule } from './routes/category-routing.module';


import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { ViewCategoryHcComponent } from './components/view-category-hc/view-category-hc.component';
import { SearchCategoryPipe } from './pipes/search-category/search-category.pipe';
import { CategoryHeaderHcComponent } from './components/category-header-hc/category-header-hc.component';

@NgModule({
  declarations: [
    CategoryHomeComponent, 
    ListCategoriesComponent, 
    EditCategoryComponent, 
    CreateCategoryComponent, SearchCategoryPipe, ViewCategoryHcComponent, CategoryHeaderHcComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    EditorModule,
    CategoryRoutingModule,
    GuideadminModule,
    HelpcenterModule
  ]
})
export class CategoryModule { }
