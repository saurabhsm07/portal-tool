import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';


import { Article_Form } from './../../classes/article_form'
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
  postArticleForm(form: Article_Form) : Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    // .pipe()
  }

  /**
   * postArticleForm: Service function to add article
   * form : Article_Form = object to be saved in the Article_Form table
   */
  getArticleForm(form: Article_Form) : Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    // .pipe()
  }

  /**
   * postArticleForm: Service function to add article
   * form : Article_Form = object to be saved in the Article_Form table
   */
  putArticleForm(form: Article_Form) : Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    // .pipe()
  }

  /**
   * deleteArticleForm: Service function to add article
   * form : Article_Form = object to be saved in the Article_Form table
   */
  deleteArticleForm(form: Article_Form) : Observable <Article_Form> {
    return this.http.post<Article_Form>(this.requestUri.postArticleForm, form, this.headersOptions)
                    // .pipe()
  }


}
