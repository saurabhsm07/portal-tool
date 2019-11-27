import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleFieldErrorHandlerService {

  constructor() { }

  public static postArticleFieldError(error: HttpErrorResponse){
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
      msg: 'error creating Article Field'
     };
    return throwError(errObj);
  }

  public static getArticleFieldError(error: HttpErrorResponse){
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
      msg: 'error fetching Article Field'
     };
    return throwError(errObj);
  }

  public static putArticleFieldError(error: HttpErrorResponse){
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
      msg: 'error updating Article Field'
     };
    return throwError(errObj);
  }

  public static deleteArticleFieldError(error: HttpErrorResponse){
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
      msg: 'error deleting Article Field'
     };
    return throwError(errObj);
  }
}
