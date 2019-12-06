import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../imports/material-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { EditorModule } from '@tinymce/tinymce-angular'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './routes/category-routing.module';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { SearchCategoryPipe } from './pipes/search-category/search-category.pipe';

@NgModule({
  declarations: [
    CategoryHomeComponent, 
    ListCategoriesComponent, 
    EditCategoryComponent, 
    CreateCategoryComponent, SearchCategoryPipe
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
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
