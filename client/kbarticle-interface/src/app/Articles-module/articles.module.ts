import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../imports/material-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { EditorModule } from '@tinymce/tinymce-angular'

import { ArticleRoutingModule } from './routes/article-routing.module';
import { ArticleFieldsRoutingModule } from './routes/article-fields-routing.module';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { DisplayArticleComponent } from './components/display-article/display-article.component';
import { ArticleHomeComponent } from './components/article-home/article-home.component';
import { ArticleNotFoundComponent } from './components/article-not-found/article-not-found.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';

import { CreateArticleFormFieldsComponent } from './components/fields-components/create-article-form-fields/create-article-form-fields.component';
import { ArticleFormFieldsComponent } from './components/fields-components/article-form-fields/article-form-fields.component';
import { ListArticleFormFieldsComponent } from './components/fields-components/list-article-form-fields/list-article-form-fields.component';
import { EditArticleFormFieldsComponent } from './components/fields-components/edit-article-form-fields/edit-article-form-fields.component';

@NgModule({
  declarations: [
    CreateArticleComponent,
    ListArticlesComponent,
    DisplayArticleComponent,
    ArticleHomeComponent,
    ArticleNotFoundComponent,
    EditArticleComponent,
    CreateArticleFormFieldsComponent,
    ArticleFormFieldsComponent,
    ListArticleFormFieldsComponent,
    EditArticleFormFieldsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    EditorModule,
    ArticleFieldsRoutingModule,
    ArticleRoutingModule
  ],
  providers: []
})
export class ArticlesModule { }
