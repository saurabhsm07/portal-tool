import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../../classes/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
  //public serverDomain = '' //base url of the server (BUILD)

  /**
   * List of primary CRUD APIs for Category data
   */
  private requestUri = {
    getFormList: this.serverDomain + 'api/tickets/forms',
    getFormById: this.serverDomain + 'api/tickets/forms/id/',
    // updateCategory: this.serverDomain + 'api/categories/',
    // deleteCategory: this.serverDomain + 'api/categories/',
  };

  private headersOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  listForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.requestUri.getFormList, this.headersOptions);
  }

  getForm(id: string): Observable<any> {
    return this.http.get<any>(this.requestUri.getFormById+id, this.headersOptions);
  }
}
