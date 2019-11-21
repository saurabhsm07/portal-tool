import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';


import { Article_Form } from './../../classes/article_form'

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
   * 
   */
  postArticleForm(form: Article_Form)
}
