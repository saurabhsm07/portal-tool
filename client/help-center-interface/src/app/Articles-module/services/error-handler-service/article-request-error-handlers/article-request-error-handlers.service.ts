import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleRequestErrorHandlersService {

  constructor() { }

  public static postArticleError(error: HttpErrorResponse){
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
      msg: 'error creating article'
     };
    return throwError(errObj);
  }


  public static getArticleError(error: HttpErrorResponse){
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
      msg: 'error getting article'
     };
    return throwError(errObj);
  }


  public static getLastRecordError(error: HttpErrorResponse){
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
      msg: 'error getting article id'
     };
    return throwError(errObj);
  }

  public static listArticlesError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
        // The backend error
        if(error.status == 404){
          console.log(error);
          const errObj = {
            code: error.status,
            message: 'noarticle',

           };
          return throwError(errObj);
        }
        else{
  
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
  
            const errObj = {
              code: error.status,
              msg: error.error
             };
            return throwError(errObj);          
        }
      }
  }

  public static putArticleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error
      console.log(error)
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    const errObj = {
      code: 500,
      msg: 'error updating articles'
     };
    return throwError(errObj);
  }

}
