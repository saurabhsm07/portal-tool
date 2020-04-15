import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './../../classes/ticket';
import { Field_value } from '../../classes/field_value';
import { Comment } from './../../classes/comment';

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
    createComment: 'http://localhost:5000/api/tickets/comments/',
    listComments: 'http://localhost:5000/api/tickets/comments/ticketid/',
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
    return this.http.get<Ticket>(this.requestUri.getTicketById + id, this.headersOptions);
  }

  getTickets(query_on: string, query_value: number | number[]): Observable<Ticket []> {
    const queryString = TicketService.createSearchQueryString(query_on, query_value);
    console.log(queryString);
    return this.http.get<Ticket []>(this.requestUri.getTickets + queryString, this.headersOptions);
  }

  createComment(comment: Comment): Observable<{id: number}> {
    return this.http.post<{id: number}>(this.requestUri.createComment, {comment}, this.headersOptions);
  }

  listComments(ticket_id: number):  Observable<Comment[]>{
    return this.http.get<Comment[]>(this.requestUri.listComments + ticket_id, this.headersOptions);
  }

  /**
   * Method creates a query string to get tickets based on different request parameters
   * @param query_on : type of search request (get tickets where 'REQUESTER', 'FOLLOW_UP', 'organization id')
   * @param query_value : values of the request type
   */
public static createSearchQueryString(query_on: string, query_value: number | number[]): string {
  let queryString = 'query=' 
  switch(query_on){
    case 'requester':
      queryString = queryString + `type:requester id:${query_value}`;
      break;
    case 'cc_requests':
      queryString = queryString + `type:cc_requests id:${query_value}`;
      break;
    case 'org_requests':
      queryString = queryString + `type:org_requests ids:${query_value}`;
      break;
    default:
    console.log(`INVALID QUERY \n or UNSUPPORTED search ticket query on attribute :  ${query_on}`)
    break;
  }

  return queryString;
}
}
