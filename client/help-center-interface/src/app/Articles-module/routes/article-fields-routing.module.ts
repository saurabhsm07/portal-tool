import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleFormFieldsComponent } from './../components/fields-components/create-article-form-fields/create-article-form-fields.component';
import { ListArticleFormFieldsComponent } from './../components/fields-components/list-article-form-fields/list-article-form-fields.component';
import { EditArticleFormFieldsComponent } from './../components/fields-components/edit-article-form-fields/edit-article-form-fields.component';
import { AuthGuard } from './../../helpers/authentication/auth.guard';
import { AdminGuard } from '../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from './../../helpers/autherization/agent/agent.guard'



//replace below route in the future

const articleFieldsRoutes: Routes = [
  { path: 'guide/article/fields/list', component: ListArticleFormFieldsComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/article/fields/create', component: CreateArticleFormFieldsComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/article/fields/edit/:id', component: EditArticleFormFieldsComponent, canActivate: [AuthGuard, AgentGuard] },
//   { path: '', redirectTo: 'article/fields', pathMatch: 'full',},
//   { path: '**', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleFieldsRoutes)],
  exports: [RouterModule]
})
export class ArticleFieldsRoutingModule { }