import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Organization } from './../../class/organization'


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {


  public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
  //public serverDomain = '' //base url of the server (BUILD)

  
    /**
   * List of primary CRUD APIs for Organization data
   */
private requestUri = {
  getOrganizations: this.serverDomain + 'api/organizations/',
  getOrganizationById: this.serverDomain + 'api/organizations/id/',
  getOrganizationByIds: this.serverDomain + 'api/organizations/show_many?ids='
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

/**
 * 
 * @param organization_ids : list of organization ids whose information needs to be fetched
 */
getOrganizationByIds(organization_ids: number[]) : Observable<Organization[]> {
  return this.http.get< Organization[]>(this.requestUri.getOrganizationByIds + organization_ids.toString(), this.headersOptions)
}

listOrganizations() : Observable<Organization[]>{
  return this.http.get<Organization[]>(this.requestUri.getOrganizations, this.headersOptions)
              // .pipe(catchError(OrganizationRequestErrorHandlersService.listOrganizationsError));
}
}
