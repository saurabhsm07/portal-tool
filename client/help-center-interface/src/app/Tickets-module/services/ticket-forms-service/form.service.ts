import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from './../../classes/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  /**
   * List of primary CRUD APIs for Category data
   */
  private requestUri = {
    getFormList: 'http://localhost:5000/api/tickets/forms',
    getFormById: 'http://localhost:5000/api/tickets/forms/id/',
    // updateCategory: 'http://localhost:5000/api/categories/',
    // deleteCategory: 'http://localhost:5000/api/categories/',
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
