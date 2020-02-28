import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

import { Article_Label } from '../../classes/article_label';
import {ArticleLabelErrorHandlerService } from '../error-handler-service/article-label-error-handlers/article-label-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleLabelsService {
  private requestUri = {
    getArticleLabels: 'api/articles/labels/',
    getArticleLabelById: 'api/articles/labels/id/',
    postArticleLabel: 'api/articles/labels/',
    updateArticleLabel: 'api/articles/labels/',
    deleteArticleLabel: 'api/articles/labels/id/'
  }

  private headersOptions = {
    headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
  })
  };

  constructor(private http: HttpClient) { }

  /**
   * postArticleForm: Service function to add article
   * label : Article_Label = array of objects to be saved in the Article_Label table
   */
  postArticleLabels(labels: Article_Label[]): Observable <Article_Label[]> {
    return this.http.post<Article_Label[]>(this.requestUri.postArticleLabel, labels, this.headersOptions)
                    .pipe(catchError(ArticleLabelErrorHandlerService.postArticleLabelError))
  }

  /**
   * getArticleLabel: Service function to get All article labels
   *  no input variable
   */
  getArticleLabels(): Observable <Article_Label []> {
    return this.http.get<Article_Label []>(this.requestUri.getArticleLabels, this.headersOptions)
                    .pipe(catchError(ArticleLabelErrorHandlerService.getArticleLabelError))
  }

    /**
   * getArticleLabelById: Service function to get  article label by id
   *  id : string : id of the label to be fetched
   */
  getArticleLabelById(id: string): Observable <Article_Label> {
    return this.http.get<Article_Label>(this.requestUri.getArticleLabelById + id, this.headersOptions)
                    .pipe(catchError(ArticleLabelErrorHandlerService.getArticleLabelError))
  }

  /**
   * putArticleLabel: Service function to update article label
   * label : Article_Label = object to be updated in the Article_Label table
   * id : id of the label to be updated
   */
  // putArticleLabel(label: Article_Label, id: Number): Observable <{id : Number}> {
  //   return this.http.put<{id : Number}>(this.requestUri.postArticleLabel, {label, id}, this.headersOptions)
  //                   .pipe(catchError(ArticleLabelErrorHandlerService.putArticleLabelError))
  // }

  /**
   * deleteArticleLabel: Service function to delete article Label
   * label : id = id of the article label to be deleted
   */
  // deleteArticleLabel(label: Article_Label): Observable <Article_Label> {
  //   return this.http.post<Article_Label>(this.requestUri.postArticleLabel, label, this.headersOptions)
  //                   .pipe(catchError(ArticleLabelErrorHandlerService.deleteArticleLabelError))
  // }
}
