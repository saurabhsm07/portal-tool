import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from './../../classes/field';
import { Field_value } from '../../classes/field_value';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
    //public serverDomain = '' //base url of the server (BUILD)
    
    /**
   * List of primary CRUD APIs for ticket fields data
   */
  public requestUri = {
    getFieldList: this.serverDomain + 'api/tickets/fields?ids=',
    getFieldById: this.serverDomain + 'api/tickets/fields/id/',
    // updateCategory: this.serverDomain + 'api/categories/',
    // deleteCategory: this.serverDomain + 'api/categories/',
  };



  public headersOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  
  constructor(public http: HttpClient) { }

  getFieldsByIds(field_ids: string[]): Observable<Field_value[]> {
    return this.http.get<Field_value[]>(this.requestUri.getFieldList + field_ids.join(","), this.headersOptions);
  }
}
