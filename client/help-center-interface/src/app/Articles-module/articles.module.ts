import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../imports/material-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { EditorModule } from '@tinymce/tinymce-angular'
import { FormsModule } from '@angular/forms';

import { GuideadminModule } from '../Guideadmin-module/guideadmin.module';
import { HelpcenterModule } from '../Helpcenter-module/helpcenter.module';
// routing components
import { ArticleRoutingModule } from './routes/article-routing.module';
import { ArticleFieldsRoutingModule } from './routes/article-fields-routing.module';
import { ArticleFormsRoutingModule } from './routes/article-form-routing.module'

// articles components
import { CreateArticleComponent } from './components/article-components/create-article/create-article.component';
import { ListArticlesComponent } from './components/article-components/list-articles/list-articles.component';
import { DisplayArticleComponent } from './components/article-components/display-article/display-article.component';
import { ArticleHomeComponent } from './components/article-components/article-home/article-home.component';
import { ArticleNotFoundComponent } from './components/article-components/article-not-found/article-not-found.component';
import { EditArticleComponent } from './components/article-components/edit-article/edit-article.component';

// article fields components
import { CreateArticleFormFieldsComponent } from './components/fields-components/create-article-form-fields/create-article-form-fields.component';
import { ArticleFormFieldsComponent } from './components/fields-components/article-form-fields/article-form-fields.component';
import { ListArticleFormFieldsComponent } from './components/fields-components/list-article-form-fields/list-article-form-fields.component';
import { EditArticleFormFieldsComponent } from './components/fields-components/edit-article-form-fields/edit-article-form-fields.component';

// article form components
import { ArticleFormComponent } from './components/form-components/article-form/article-form.component';
import { CreateArticleFormComponent } from './components/form-components/create-article-form/create-article-form.component';
import { EditArticleFormComponent } from './components/form-components/edit-article-form/edit-article-form.component';
import { ListArticleFormComponent } from './components/form-components/list-article-form/list-article-form.component';


// filter Pipes
import { SearchFieldPipe } from './pipes/search-article-field/search-field.pipe';
import { SearchArticleFormPipe } from './pipes/search-article-form/search-article-form.pipe';
import { SearchArticlePipe } from './pipes/search-article/search-article.pipe';
import { ViewArticleHcComponent } from './components/article-components/view-article-hc/view-article-hc.component';
import { ArticleHeaderHcComponent } from './components/article-components/article-header-hc/article-header-hc.component';
import { SanitizeArticlePipe } from './pipes/sanitize-article/sanitize-article.pipe';

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
    ArticleFormComponent,
    SearchFieldPipe,
    CreateArticleFormComponent,
    EditArticleFormComponent,
    ListArticleFormComponent,
    SearchArticleFormPipe,
    SearchArticlePipe,
    ViewArticleHcComponent,
    ArticleHeaderHcComponent,
    SanitizeArticlePipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    EditorModule,
    ArticleFieldsRoutingModule,
    ArticleFormsRoutingModule,
    ArticleRoutingModule,
    GuideadminModule,
    HelpcenterModule,
  ],
  providers: []
})
export class ArticlesModule { }
