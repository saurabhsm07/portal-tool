import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleFormErrorHandlerService {

  constructor() { }

  public static postArticleFormError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable : mock drone object
    const errObj = {
      code: 500,
      msg: 'error creating Article Form'
     };
    return throwError(errObj);
  }

  public static getArticleFormError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable : mock drone object
    const errObj = {
      code: 500,
      msg: 'error fetching Article Form'
     };
    return throwError(errObj);
  }

  public static putArticleFormError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable : mock drone object
    const errObj = {
      code: 500,
      msg: 'error updating Article Form'
     };
    return throwError(errObj);
  }

  public static deleteArticleFormError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable : mock drone object
    const errObj = {
      code: 500,
      msg: 'error deleting Article Form'
     };
    return throwError(errObj);
  }
}
