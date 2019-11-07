import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleAttachmentErrorHandlersService {

  constructor() { }

public static postAttachmentError(error: HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    console.error('A client side error occurred:', error.error.message)
  }
  else {
    console.error(
      `Server returned error code ${error.status},` +
      `error body: ${error.error}`
    )
  }

  return Observable.throw({error, error_on_req : 'error on post attachments for article id request'})
  
}


public static getAttachmentsError(error: HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    console.error('A client side error occurred:', error.error.message)
  }
  else {
    console.error(
      `Server returned error code ${error.status},` +
      `error body: ${error.error}`
    )
  }

  return Observable.throw({error, error_on_req : 'error on get attachments for article id request'})
}
}
