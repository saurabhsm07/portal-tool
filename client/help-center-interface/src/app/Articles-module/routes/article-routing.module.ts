import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './../components/article-components/create-article/create-article.component';
import { ListArticlesComponent } from './../components/article-components/list-articles/list-articles.component';
import { DisplayArticleComponent } from './../components/article-components/display-article/display-article.component';
import { ArticleHomeComponent } from './../components/article-components/article-home/article-home.component';
import { ArticleNotFoundComponent } from './../components/article-components/article-not-found/article-not-found.component'
import { EditArticleComponent } from './../components/article-components/edit-article/edit-article.component';
import { ViewArticleHcComponent } from './../components/article-components/view-article-hc/view-article-hc.component';
const articleRoutes: Routes = [
  { path: 'articles/home', component: ArticleHomeComponent },
  { path: 'articles/create', component: CreateArticleComponent },
  { path: 'articles/list', component: ListArticlesComponent },
  { path: 'articles/id/:id', component: DisplayArticleComponent },
  { path: 'articles/edit/id/:id', component: EditArticleComponent },
  { path: 'hc/en-us/articles/id/:id', component: ViewArticleHcComponent},
  { path: '**', component: ArticleNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }