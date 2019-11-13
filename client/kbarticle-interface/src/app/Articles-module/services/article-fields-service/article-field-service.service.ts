import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
// import { ArticleFieldErrorHandlersService } from './../error-handler-service/article-attachment-error-handlers/article-attachment-error-handlers.service'

import { Article_Field } from './../../classes/article_fields'

@Injectable({
  providedIn: 'root'
})
export class ArticleFieldService {

  private requestUri = {
    getArticleFields: 'http://localhost:5000/api/articles/fields',
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
   * postArticleField : Service function to make a API call to the Create Field Api
 article_field : Article_field   = object to be saved Article_Field database table */
 postArticleField(field: Article_Field) : Observable<Article_Field> {
  return this.http.post<Article_Field>(this.requestUri.postArticleField, field , this.headersOptions)
                  // .pipe(catchError(ArticleRequestErrorHandlersService.postArticleError));

}


getArticleField(): Observable<Article_Field[]>{
  return this.http.get<Article_Field[]>(this.requestUri.getArticleFields, this.headersOptions)
               // .pipe(catchError(ArticleRequestErrorHandlersService.postArticleError));
}
  }

