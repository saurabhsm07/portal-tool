import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
// import { ArticleFieldErrorHandlersService } from './../error-handler-service/article-attachment-error-handlers/article-attachment-error-handlers.service'

import { Article_Field } from './../../classes/article_fields'
import { Article } from '../../classes/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleFieldServiceService {

  private requestUri = {
    getArticleFields: 'http://localhost:5000/api/articles/field',
    getArticleFieldById: 'http://localhost:5000/api/articles/fields/id',
    postArticleField: 'http://localhost:5000/api/articles/fields/',
    updateArticleField: 'http://localhost:5000/api/articles/fields/',
    deleteArticleField: 'http://localhost:5000/api/articles/fields/',
};

private headersOptions = {
  headers: new HttpHeaders({
  // 'Content-Type':  'application/json',
})
};

  constructor(private http: HttpClient) { }

  /**
   * createArticleField
 article_field : Article_field   */
 postArticleField(field: Article_Field) : Observable<Article_Field> {
  return this.http.post<Article_Field>(this.requestUri.postArticleField, field , this.headersOptions)
                  // .pipe(catchError(ArticleRequestErrorHandlersService.postArticleError));

}
  }

