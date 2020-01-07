import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleLabelErrorHandlerService {

  constructor() { }

  public static postArticleLabelError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    const errObj = {
      code: 500,
      msg: 'error creating Article Label'
     };
    return throwError(errObj);
  }

  public static getArticleLabelError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    const errObj = {
      code: 500,
      msg: 'error fetching Article Label'
     };
    return throwError(errObj);
  }

  public static putArticleLabelError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    const errObj = {
      code: 500,
      msg: 'error updating Article Label'
     };
    return throwError(errObj);
  }

  public static deleteArticleLabelError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    const errObj = {
      code: 500,
      msg: 'error deleting Article Label'
     };
    return throwError(errObj);
  }
}
