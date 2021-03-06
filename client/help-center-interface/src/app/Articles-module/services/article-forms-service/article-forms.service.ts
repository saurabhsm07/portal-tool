import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ArticleFormErrorHandlerService } from '../error-handler-service/article-form-error-handlers/article-form-error-handler.service';


import { Article_Form } from '../../classes/article_form';

@Injectable({
  providedIn: 'root'
})
export class ArticleFormsService {

  public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
  //public serverDomain = '' //base url of the server (BUILD)
  
  private requestUri = {
    getArticleForms: this.serverDomain + 'api/articles/forms/',
    getArticleFormById: this.serverDomain + 'api/articles/forms/id/',
    postArticleForm: this.serverDomain + 'api/articles/forms/',
    updateArticleForm: this.serverDomain + 'api/articles/forms/',
    deleteArticleForm: this.serverDomain + 'api/articles/forms/id/'
  }

  private headersOptions = {
    headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
  })
  };

  constructor(private http: HttpClient) { }

  /**
   * postArticleForm: Service function to add article
   * form : Article_Form = object to be saved in the Article_Form table
   */
  postArticleForm(form: Article_Form): Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    .pipe(catchError(ArticleFormErrorHandlerService.postArticleFormError))
  }

  /**
   * getArticleForm: Service function to get All article forms
   *  no input variable
   */
  getArticleForm(): Observable <Article_Form []> {
    return this.http.get<Article_Form []>(this.requestUri.getArticleForms, this.headersOptions)
                    .pipe(catchError(ArticleFormErrorHandlerService.getArticleFormError))
  }

    /**
   * getArticleFormById: Service function to get  article form by id
   *  id : string : id of the form to be fetched
   */
  getArticleFormById(id: string): Observable <Article_Form> {
    return this.http.get<Article_Form>(this.requestUri.getArticleFormById + id, this.headersOptions)
                    .pipe(catchError(ArticleFormErrorHandlerService.getArticleFormError))
  }

  /**
   * putArticleForm: Service function to update article form
   * form : Article_Form = object to be updated in the Article_Form table
   * id : id of the form to be updated
   */
  putArticleForm(form: Article_Form, id: Number): Observable <{id : Number}> {
    return this.http.put<{id : Number}>(this.requestUri.postArticleForm, {form, id}, this.headersOptions)
                    .pipe(catchError(ArticleFormErrorHandlerService.putArticleFormError))
  }

  /**
   * deleteArticleForm: Service function to delete article Form
   * form : id = id of the article form to be deleted
   */
  deleteArticleForm(form: Article_Form): Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    .pipe(catchError(ArticleFormErrorHandlerService.deleteArticleFormError))
  }


}
