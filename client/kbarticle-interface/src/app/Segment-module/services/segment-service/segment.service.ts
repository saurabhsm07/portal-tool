import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Segment } from './../../classes/segment';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
 /**
   * List of primary CRUD APIs for Segment data
   */
  private requestUri = {
    getSegments: 'http://localhost:5000/api/segments/',
    getSegmentById: 'http://localhost:5000/api/segments/id/',
    // getSegmentInCategory: 'http://localhost:5000/api/segments/category/id/',
    postSegment: 'http://localhost:5000/api/segments/',
    updateSegment: 'http://localhost:5000/api/segments/',
    deleteSegment: 'http://localhost:5000/api/segments/',
  };
  
  private headersOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
  };
  
  constructor(private http: HttpClient) { }
  
  postSegment(segment : Segment) : Observable<Segment> {
    return this.http.post<Segment>(this.requestUri.postSegment, {segment : segment}, this.headersOptions)
        // .pipe(catchError());
  }
  
  getSegment(id : String) : Observable<Segment> {
    return this.http.get<Segment>(this.requestUri.getSegmentById+id, this.headersOptions)
              //  .pipe(catchError(CategoryRequestErrorHandlersService.getCategoryError));
  }
  
  // getSegmentInCategory(id : String) : Observable<Segment[]> {
  //   return this.http.get<Segment[]>(this.requestUri.getSegmentInCategory+id, this.headersOptions)
  //             //  .pipe(catchError(CategoryRequestErrorHandlersService.getCategoryError));
  // }
  
  listSegments() : Observable<Segment[]>{
    return this.http.get<Segment[]>(this.requestUri.getSegments, this.headersOptions)
                // .pipe(catchError(CategoryRequestErrorHandlersService.listCategorysError));
  }
  
  updateSegment(segment: Segment): Observable<any>{
    return this.http.put<any>(this.requestUri.updateSegment, {segment : segment}, this.headersOptions)
              //  .pipe(catchError(CategoryRequestErrorHandlersService.putCategoryError))
  }
  
  deleteSegment(id: String) : Observable<any> {
    return this.http.delete<any>(this.requestUri.deleteSegment + id, this.headersOptions )
                // .pipe(catchError(CategoryRequestErrorHandlersService.))
  }
}
