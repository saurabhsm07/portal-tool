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

  /**
   * List of primary CRUD APIs for Section data
   */
private requestUri = {
  getSections: 'api/sections/',
  getSectionById: 'api/sections/id/',
  getSectionInCategory: 'api/sections/category/id/',
  postSection: 'api/sections/',
  updateSection: 'api/sections/',
  deleteSection: 'api/sections/',
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
