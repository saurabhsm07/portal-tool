import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ArticleAttachmentErrorHandlersService } from '../error-handler-service/article-attachment-error-handlers/article-attachment-error-handlers.service'

import { Article_Attachment } from '../../classes/article_attachment'
@Injectable({
  providedIn: 'root'
})
export class ArticleAttachmentsService {
public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
//public serverDomain = '' //base url of the server (BUILD)


private requestUri = {
    getArticleAttachments: this.serverDomain + 'api/articles/',
    getArticleAttachmentById: this.serverDomain + 'api/articles/id/',
    postArticleAttachment: this.serverDomain + 'api/articles/',
    updateArticleAttachment: this.serverDomain + 'api/articles/',
    deleteArticleAttachment: this.serverDomain + 'api/articles/',
};

  private article_id: string;

  private headersOptions = {
    headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
})
};

  constructor(private http: HttpClient) { 
    this.article_id = '0';
  }

/**
 * GetArticleAttachments
article_id */
public getArticleAttachments(article_id: number) : Observable<Article_Attachment[]> {
  this.article_id = article_id.toString();
  console.log(this.requestUri.getArticleAttachments)
  return this.http.get<Article_Attachment[]>(this.requestUri.getArticleAttachments, this.headersOptions)
                  .pipe(catchError(ArticleAttachmentErrorHandlersService.getAttachmentsError))
}

public postArticleAttachment(attachment: Article_Attachment) : Observable<Article_Attachment> {
  
  this.article_id = attachment.article_id.toString();
  let formData: FormData = new FormData();
  
  formData.append('article_id',  attachment.article_id.toString());
  formData.append('inline', attachment.inline.toString());
  formData.append('attachment', attachment.file_data)

  return this.http.post<Article_Attachment>(this.requestUri.postArticleAttachment+this.article_id+'/attachments', formData, this.headersOptions)
                  .pipe(catchError(ArticleAttachmentErrorHandlersService.postAttachmentError))
}

public logService(){
  console.log("logging works")
}

}
