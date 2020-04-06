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
    getTickets: 'http://localhost:5000/api/tickets/search?',
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

  createTicket(ticket_object: Ticket): Observable<{id: number}> {
    return this.http.post<{id: number}>(this.requestUri.createTicket, {ticket_object}, this.headersOptions);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.requestUri.getTicketById, this.headersOptions);
  }

  getTickets(query_on: string, key: string | number[], status: string): Observable<Ticket []> {

    const queryString = TicketService.createSearchQueryString(query_on, key, status);
    console.log(queryString);
    return this.http.get<Ticket []>(this.requestUri.getTickets + queryString, this.headersOptions);
  }

  /**
   * Method creates a query string to get tickets based on different request parameters
   * @param query_on : type of search request (get tickets where 'REQUESTER', 'FOLLOW_UP', 'organization id')
   * @param key : values of the request type
   * @param status : status of the tickets to be returned
   */
public static createSearchQueryString(query_on: string, key: string | number[], status: string): string {
  let queryString = 'query=' 
  switch(query_on){
    case 'requester':
      queryString = queryString + `type:requester requester_id:${key} status:${status}`;
      break;
    case 'cc_tickets':
      queryString = queryString + `type:cc_tickets cc_id = ${key} status:${status}`;
      break;
    case 'organization':
      queryString = queryString + `type:organization organization_ids = ${key} status: ${status}`;
      break;
    default:
    console.log(`INVALID QUERY \n or UNSUPPORTED search ticket query on attribute :  ${query_on}`)
    break;
  }

  return queryString;
}
}
