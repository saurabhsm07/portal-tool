import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Organization } from '../../classes/organization';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

    /**
   * List of primary CRUD APIs for Organization data
   */
private requestUri = {
  getOrganizations: 'api/organizations/',
  getOrganizationById: 'api/organizations/id/',
};

private headersOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
})
};

constructor(private http: HttpClient) { }

getOrganization(id : String) : Observable<Organization> {
  return this.http.get<Organization>(this.requestUri.getOrganizationById+id, this.headersOptions)
            //  .pipe(catchError(OrganizationRequestErrorHandlersService.getOrganizationError));
}

listOrganizations() : Observable<Organization[]>{
  return this.http.get<Organization[]>(this.requestUri.getOrganizations, this.headersOptions)
              // .pipe(catchError(OrganizationRequestErrorHandlersService.listOrganizationsError));
}
}
