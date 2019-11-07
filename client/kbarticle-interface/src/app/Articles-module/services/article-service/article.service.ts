import { Injectable } from '@angular/core';
import { Article } from './../../classes/article';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import {ArticleRequestErrorHandlersService } from './../error-handler-service/article-request-error-handlers.service'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private requestUri = {
    getArticles: 'http://localhost:5000/api/articles/',
    getArticleById: 'http://localhost:5000/api/articles/id/',
    postArticle: 'http://localhost:5000/api/articles/',
    updateArticle: 'http://localhost:5000/api/articles/',
    deleteArticle: 'http://localhost:5000/api/articles/',
};

  private headersOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
})
};

  constructor(private http: HttpClient) { }

  postArticle({article: Article}) : Observable<Article> {
    return this.http.post<Article>(this.requestUri.postArticle, {article : Article} , this.headersOptions)
                    .pipe(catchError(ArticleRequestErrorHandlersService.postArticleError));

  }

  getArticle(id : String) : Observable<Article> {
    return this.http.get<Article>(this.requestUri.getArticleById+id, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.getArticleError));
  }

  listArticles() : Observable<Article[]>{
    return this.http.get<Article[]>(this.requestUri.getArticles, this.headersOptions)
                .pipe(catchError(ArticleRequestErrorHandlersService.listArticlesError));
  }

  updateArticle({article: Article}): Observable<Article>{
    console.log("in update article");
    return this.http.put<Article>(this.requestUri.updateArticle, {article : Article}, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.putArticleError))
  }
}
