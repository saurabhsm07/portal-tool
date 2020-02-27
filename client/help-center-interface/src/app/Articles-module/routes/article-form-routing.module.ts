import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleFormComponent } from '../components/form-components/create-article-form/create-article-form.component';
import { ArticleFormComponent } from '../components/form-components/article-form/article-form.component';
import { EditArticleFormComponent } from '../components/form-components/edit-article-form/edit-article-form.component';
import { ListArticleFormComponent } from '../components/form-components/list-article-form/list-article-form.component';

import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { AdminGuard } from '../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from '../../helpers/autherization/agent/agent.guard'
//replace below route in the future
const articleFormsRoutes: Routes = [
  { path: 'guide/article/forms', component: ArticleFormComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/article/forms/list', component: ListArticleFormComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/article/forms/create', component: CreateArticleFormComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/article/forms/edit/:id', component: EditArticleFormComponent, canActivate: [AuthGuard, AgentGuard] },
//   { path: '**', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleFormsRoutes)],
  exports: [RouterModule]
})
export class ArticleFormsRoutingModule { }