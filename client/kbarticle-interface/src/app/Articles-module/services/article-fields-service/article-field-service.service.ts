import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ArticleFieldErrorHandlerService } from './../error-handler-service/article-field-error-handlers/article-field-error-handler.service';


import { Article_Field } from './../../classes/article_fields'

@Injectable({
  providedIn: 'root'
})
export class ArticleFieldService {

  private requestUri = {
    getArticleFields: 'http://localhost:5000/api/articles/fields',
    getArticleFieldById: 'http://localhost:5000/api/articles/fields/id',
    listArticleFieldsByIds: 'http://localhost:5000/api/articles/fields/list?ids=',
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
                  .pipe(catchError(ArticleFieldErrorHandlerService.postArticleFieldError));

}

/**
 * getArticleFields: Service function to fetch all article fields in an article
 */
getArticleField(): Observable<Article_Field[]>{
  return this.http.get<Article_Field[]>(this.requestUri.getArticleFields, this.headersOptions)
                  .pipe(catchError(ArticleFieldErrorHandlerService.getArticleFieldError));
}

/**
* getArticleFields: Service function to fetch article field by i.d
*/
listArticleFieldByIds(ids:Number []): Observable<Article_Field []>{
 return this.http.get<Article_Field []>(this.requestUri.listArticleFieldsByIds + ids, this.headersOptions)
                 .pipe(catchError(ArticleFieldErrorHandlerService.getArticleFieldError));
}

/**
* getArticleFields: Service function to fetch article field by i.d
*/
getArticleFieldById(id :Number): Observable<Article_Field>{
  return this.http.get<Article_Field>(this.requestUri.getArticleFieldById+'/'+id, this.headersOptions)
                  .pipe(catchError(ArticleFieldErrorHandlerService.getArticleFieldError));
 }

/**
 * updateArticleField: Service function to update article field
 */
updateArticleField(field: Article_Field, id: number) : Observable<{id : number}> {
  return this.http.put<{id: number}>(this.requestUri.updateArticleField, {field,id}, this.headersOptions)
                  .pipe(catchError(ArticleFieldErrorHandlerService.putArticleFieldError));
}

/**
 * updateArticleField: Service function to update article field
 */
deleteArticleField(id: number) : Observable<Article_Field> {
  return this.http.put<Article_Field>(this.requestUri.updateArticleField+'/'+id, this.headersOptions)
                  .pipe(catchError(ArticleFieldErrorHandlerService.deleteArticleFieldError));
}

  }


