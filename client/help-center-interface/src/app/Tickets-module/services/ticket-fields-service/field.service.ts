import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from './../../classes/field';
import { Field_value } from '../../classes/field_value';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

    /**
   * List of primary CRUD APIs for Category data
   */
  private requestUri = {
    getFieldList: 'http://localhost:5000/api/tickets/fields?ids=',
    getFieldById: 'http://localhost:5000/api/tickets/fields/id/',
    // updateCategory: 'http://localhost:5000/api/categories/',
    // deleteCategory: 'http://localhost:5000/api/categories/',
  };



  private headersOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  
  constructor(private http: HttpClient) { }

  getFieldsByIds(field_ids: string[]): Observable<Field_value[]> {
    return this.http.get<Field_value[]>(this.requestUri.getFieldList + field_ids.join(","), this.headersOptions);
  }
}
