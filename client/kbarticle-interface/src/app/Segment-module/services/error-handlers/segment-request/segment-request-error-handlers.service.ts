import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegmentRequestErrorHandlersService {

  constructor() { }

  public static postSegmentError(error: HttpErrorResponse){
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
      msg: 'error creating user segment'
     };
    return throwError(errObj);
  }

  public static getSegmentError(error: HttpErrorResponse){
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
      msg: 'error getting user segment'
     };
    return throwError(errObj);
  }

  public static listSegmentsError(error: HttpErrorResponse){
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
      msg: 'error listing user segments'
     };
    return throwError(errObj);
  }

  public static putSegmentError(error: HttpErrorResponse){
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
      msg: 'error updating user segment'
     };
    return throwError(errObj);
  }
}


