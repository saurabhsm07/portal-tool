import { Injectable } from '@angular/core';
import { Article } from '../../classes/article';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ArticleRequestErrorHandlersService } from '../error-handler-service/article-request-error-handlers/article-request-error-handlers.service'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  /**
   * List of primary CRUD APIs for Article Data
   */
  private requestUri = {
    getArticles: 'http://localhost:5000/api/articles/',
    getArticlesWithSectionId: 'http://localhost:5000/api/articles/section/id/',
    getArticleById: 'http://localhost:5000/api/articles/id/',
    getLastArticleId: 'http://localhost:5000/api/articles/max/id',
    postArticle: 'http://localhost:5000/api/articles/',
    updateArticle: 'http://localhost:5000/api/articles/',
    deleteArticle: 'http://localhost:5000/api/articles/id/',
};

  private headersOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
})
};

  constructor(private http: HttpClient) { }

  postArticle(article: Article) : Observable<Article> {
    return this.http.post<Article>(this.requestUri.postArticle, {article: article}  , this.headersOptions)
                    .pipe(catchError(ArticleRequestErrorHandlersService.postArticleError));

  }

  getArticle(id : String) : Observable<Article> {
    return this.http.get<Article>(this.requestUri.getArticleById+id, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.getArticleError));
  }

  getArticlesWithSectionId(id : String) : Observable<Article[]> {
    return this.http.get<Article[]>(this.requestUri.getArticlesWithSectionId+id, this.headersOptions)
                    .pipe(catchError(ArticleRequestErrorHandlersService.listArticlesError));
  }

  getLastRecordId(): Observable<{id : number}> {
    return this.http.get<{id: number}>(this.requestUri.getLastArticleId,this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.getLastRecordError));
  }

  listArticles() : Observable<Article[]>{
    return this.http.get<Article[]>(this.requestUri.getArticles, this.headersOptions)
                .pipe(catchError(ArticleRequestErrorHandlersService.listArticlesError));
  }

  updateArticle(article: Article): Observable<Article>{
    return this.http.put<Article>(this.requestUri.updateArticle,{article: article}, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.putArticleError))
  }

  deleteArticle(id: String) : Observable<any> {
    return this.http.delete<any>(this.requestUri.deleteArticle + id, this.headersOptions )
                // .pipe(catchError(ArticleRequestErrorHandlersService.))
  }
}
