import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryRequestErrorHandlersService {

  constructor() { }

  public static postCategoryError(error: HttpErrorResponse){
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
      msg: 'error creating category'
     };
    return throwError(errObj);
  }

  public static getCategoryError(error: HttpErrorResponse){
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
      msg: 'error getting category'
     };
    return throwError(errObj);
  }

  public static listCategoriesError(error: HttpErrorResponse){
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
      msg: 'error listing categorys'
     };
    return throwError(errObj);
  }

  public static putCategoryError(error: HttpErrorResponse){
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
      msg: 'error updating category'
     };
    return throwError(errObj);
  }
}
