import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './imports/material-module'

import { EditorModule } from '@tinymce/tinymce-angular'
import { AngularFontAwesomeModule } from 'angular-font-awesome'

import { GuideadminModule } from './Guideadmin-module/guideadmin.module';
import { HelpcenterModule } from './Helpcenter-module/helpcenter.module';
import { ArticlesModule} from './Articles-module/articles.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './Category-module/category.module';
import { SectionModule } from './Section-module/section.module';
import { SegmentModule } from './Segment-module/segment.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    GuideadminModule,
    HelpcenterModule,
    CategoryModule,
    SectionModule,
    SegmentModule,
    ArticlesModule,
    AppRoutingModule,
    EditorModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
