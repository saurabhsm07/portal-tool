import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './../../classes/ticket';
import { Field_value } from '../../classes/field_value';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  /**
   * List of primary CRUD APIs for Category data
   */
  public requestUri = {
    getTickets: 'http://localhost:5000/api/tickets/',
    getTicketById: 'http://localhost:5000/api/tickets/id/',
    createTicket: 'http://localhost:5000/api/tickets/',
    updateCategory: 'http://localhost:5000/api/categories/',
  };



  public headersOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  
  constructor(public http: HttpClient) { }

  createTicket(ticket_object: Ticket): Observable<{string: number}> {
    return this.http.post<{string: number}>(this.requestUri.createTicket, {ticket_object}, this.headersOptions);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.requestUri.getTicketById, this.headersOptions);
  }

  getTickets(): Observable<Ticket []> {
    return this.http.get<Ticket []>(this.requestUri.getTickets, this.headersOptions);
  }


}
