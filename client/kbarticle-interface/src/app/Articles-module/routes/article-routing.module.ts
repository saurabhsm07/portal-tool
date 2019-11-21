import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './../components/create-article/create-article.component';
import { ListArticlesComponent } from './../components/list-articles/list-articles.component';
import { DisplayArticleComponent } from './../components/display-article/display-article.component';
import { ArticleHomeComponent } from './../components/article-home/article-home.component';
import { ArticleNotFoundComponent } from './../components/article-not-found/article-not-found.component'

const articleRoutes: Routes = [
  { path: 'articles/home', component: ArticleHomeComponent },
  { path: 'article/create', component: CreateArticleComponent },
  { path: 'articles/list', component: ListArticlesComponent },
  { path: 'article/id/:id', component: DisplayArticleComponent },
  { path: '', redirectTo: '/articles/home', pathMatch: 'full',},
  { path: '**', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }