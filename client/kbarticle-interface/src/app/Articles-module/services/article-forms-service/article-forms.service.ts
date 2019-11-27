import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';


import { Article_Form } from './../../classes/article_form';
import { Article_Field } from '../../classes/article_fields';

@Injectable({
  providedIn: 'root'
})
export class ArticleFormsService {

  private requestUri = {
    getArticleForms: 'http://localhost:5000/api/articles/forms/',
    getArticleFormById: 'http://localhost:5000/api/articles/forms/id/',
    postArticleForm: 'http://localhost:5000/api/articles/forms/',
    updateArticleForm: 'http://localhost:5000/api/articles/forms/',
    deleteArticleForm: 'http://localhost:5000/api/articles/forms/id/'
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
                    // .pipe()
  }

  /**
   * getArticleForm: Service function to get All article forms
   *  no input variable
   */
  getArticleForm(): Observable <Article_Form []> {
    return this.http.get<Article_Form []>(this.requestUri.getArticleForms, this.headersOptions);
                    // .pipe()
  }

    /**
   * getArticleFormById: Service function to get  article form by id
   *  id : string : id of the form to be fetched
   */
  getArticleFormById(id: string): Observable <Article_Form> {
    return this.http.get<Article_Form>(this.requestUri.getArticleFormById + id, this.headersOptions);
                    // .pipe()
  }

  /**
   * putArticleForm: Service function to update article form
   * form : Article_Form = object to be updated in the Article_Form table
   * id : id of the form to be updated
   */
  putArticleForm(form: Article_Form, id: Number): Observable <{id : Number}> {
    return this.http.put<{id : Number}>(this.requestUri.postArticleForm, {form, id}, this.headersOptions)
                    // .pipe()
  }

  /**
   * deleteArticleForm: Service function to add article
   * form : Article_Form = object to be saved in the Article_Form table
   */
  deleteArticleForm(form: Article_Form): Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    // .pipe()
  }


}
