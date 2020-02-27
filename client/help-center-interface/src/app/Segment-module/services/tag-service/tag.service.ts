import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tag } from '../../classes/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

    /**
   * List of primary CRUD APIs for Tags data
   */
  private requestUri = {
    getTags: 'http://localhost:5000/api/tags/',
    getTagById: 'http://localhost:5000/api/tags/id/',
  };
  
  private headersOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
  };
  
  constructor(private http: HttpClient) { }
  
  getTag(id : String) : Observable<Tag> {
    return this.http.get<Tag>(this.requestUri.getTagById+id, this.headersOptions)
              //  .pipe(catchError(TagRequestErrorHandlersService.getTagError));
  }
  
  listTags() : Observable<Tag[]>{
    return this.http.get<Tag[]>(this.requestUri.getTags, this.headersOptions)
                // .pipe(catchError(TagRequestErrorHandlersService.listTagsError));
  }
}
