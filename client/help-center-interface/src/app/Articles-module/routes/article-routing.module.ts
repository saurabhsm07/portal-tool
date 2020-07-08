import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from '../components/article-components/create-article/create-article.component';
import { ListArticlesComponent } from '../components/article-components/list-articles/list-articles.component';
import { DisplayArticleComponent } from '../components/article-components/display-article/display-article.component';
import { ArticleHomeComponent } from '../components/article-components/article-home/article-home.component';
import { ArticleNotFoundComponent } from '../components/article-components/article-not-found/article-not-found.component'
import { EditArticleComponent } from '../components/article-components/edit-article/edit-article.component';
import { ViewArticleHcComponent } from '../components/article-components/view-article-hc/view-article-hc.component';
import { ListArticlesHcComponent } from '../components/article-components/list-articles-hc/list-articles-hc.component';
import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { AdminGuard } from '../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from '../../helpers/autherization/agent/agent.guard'

const articleRoutes: Routes = [
  { path: 'guide/articles/home', component: ArticleHomeComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/articles/create', component: CreateArticleComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/articles/list', component: ListArticlesComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/articles/id/:id', component: DisplayArticleComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/articles/edit/id/:id', component: EditArticleComponent, canActivate: [AuthGuard, AgentGuard] },
  {path: 'guide/home', redirectTo: 'guide/articles/list', pathMatch: 'full' },
  { path: 'hc/en-us/articles/id/:id', component: ViewArticleHcComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/articles/contributions', component: ListArticlesHcComponent, canActivate: [AuthGuard]},
  { path: 'hc/en-us/articles/*', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }