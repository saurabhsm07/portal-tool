import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleFormComponent } from './../components/form-components/create-article-form/create-article-form.component';
import { ArticleFormComponent } from './../components/form-components/article-form/article-form.component';
import { EditArticleFormComponent } from './../components/form-components/edit-article-form/edit-article-form.component';
import { ListArticleFormComponent } from './../components/form-components/list-article-form/list-article-form.component';

//replace below route in the future
import { ArticleNotFoundComponent } from './../components/article-not-found/article-not-found.component'

const articleFormsRoutes: Routes = [
  { path: 'article/forms/', component: ArticleFormComponent },
  { path: 'article/forms/list', component: ListArticleFormComponent },
  { path: 'article/form/create', component: CreateArticleFormComponent },
  { path: 'article/form/edit/:id', component: EditArticleFormComponent },
//   { path: '**', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleFormsRoutes)],
  exports: [RouterModule]
})
export class ArticleFormsRoutingModule { }