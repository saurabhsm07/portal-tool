import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Section } from '../../classes/section';
import { SectionRequestErrorHandlersService } from '../error-handlers/section-request/section-request-error-handlers.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {


  //public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
  public serverDomain = '' //base url of the server (BUILD)
  
  /**
   * List of primary CRUD APIs for Section data
   */
private requestUri = {
  getSections: this.serverDomain + 'api/sections/',
  getSectionById: this.serverDomain + 'api/sections/id/',
  getSectionInCategory: this.serverDomain + 'api/sections/category/id/',
  postSection: this.serverDomain + 'api/sections/',
  updateSection: this.serverDomain + 'api/sections/',
  deleteSection: this.serverDomain + 'api/sections/',
};

private headersOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
})
};

constructor(private http: HttpClient) { }

postSection(section : Section) : Observable<Section> {
  return this.http.post<Section>(this.requestUri.postSection, {section : section}, this.headersOptions)
      .pipe(catchError(SectionRequestErrorHandlersService.postSectionError));
}

getSection(id : String) : Observable<Section> {
  return this.http.get<Section>(this.requestUri.getSectionById+id, this.headersOptions)
             .pipe(catchError(SectionRequestErrorHandlersService.getSectionError));
}

getSectionInCategory(id : String) : Observable<Section[]> {
  return this.http.get<Section[]>(this.requestUri.getSectionInCategory+id, this.headersOptions)
             .pipe(catchError(SectionRequestErrorHandlersService.listSectionsError));
}

listSections() : Observable<Section[]>{
  return this.http.get<Section[]>(this.requestUri.getSections, this.headersOptions)
              .pipe(catchError(SectionRequestErrorHandlersService.listSectionsError));
}

updateSection(section: Section): Observable<any>{
  return this.http.put<any>(this.requestUri.updateSection, {section : section}, this.headersOptions)
             .pipe(catchError(SectionRequestErrorHandlersService.putSectionError))
}

deleteSection(id: String) : Observable<any> {
  return this.http.delete<any>(this.requestUri.deleteSection + id, this.headersOptions )
              // .pipe(catchError(CategoryRequestErrorHandlersService.))
}
}
