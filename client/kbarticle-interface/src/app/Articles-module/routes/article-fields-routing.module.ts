import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleFormFieldsComponent } from './../components/fields-components/create-article-form-fields/create-article-form-fields.component';
import { ArticleFormFieldsComponent } from './../components/fields-components/article-form-fields/article-form-fields.component';
import { ListArticleFormFieldsComponent } from './../components/fields-components/list-article-form-fields/list-article-form-fields.component';

import { EditArticleFormFieldsComponent } from './../components/fields-components/edit-article-form-fields/edit-article-form-fields.component';



//replace below route in the future
import { ArticleNotFoundComponent } from './../components/article-not-found/article-not-found.component'

const articleFieldsRoutes: Routes = [
  { path: 'article/fields', component: ArticleFormFieldsComponent },
//   { path: 'article/create-fields', component: CreateArticleFormFieldsComponent },
//   { path: 'article/list-fields', component: ListArticleFormFieldsComponent },
//   { path: '', redirectTo: 'article/fields', pathMatch: 'full',},
//   { path: '**', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleFieldsRoutes)],
  exports: [RouterModule]
})
export class ArticleFieldsRoutingModule { }