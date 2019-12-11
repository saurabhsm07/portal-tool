import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Section } from './../../classes/section';


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  /**
   * List of primary CRUD APIs for Section data
   */
private requestUri = {
  getSections: 'http://localhost:5000/api/sections/',
  getSectionById: 'http://localhost:5000/api/sections/id/',
  getSectionInCategory: 'http://localhost:5000/api/sections/category/id/',
  postSection: 'http://localhost:5000/api/sections/',
  updateSection: 'http://localhost:5000/api/sections/',
  deleteSection: 'http://localhost:5000/api/sections/',
};

private headersOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
})
};

constructor(private http: HttpClient) { }

postSection(section : Section) : Observable<Section> {
  return this.http.post<Section>(this.requestUri.postSection, {section : section}, this.headersOptions)
      // .pipe(catchError());
}

getSection(id : String) : Observable<Section> {
  return this.http.get<Section>(this.requestUri.getSectionById+id, this.headersOptions)
            //  .pipe(catchError(CategoryRequestErrorHandlersService.getCategoryError));
}

getSectionInCategory(id : String) : Observable<Section[]> {
  return this.http.get<Section[]>(this.requestUri.getSectionInCategory+id, this.headersOptions)
            //  .pipe(catchError(CategoryRequestErrorHandlersService.getCategoryError));
}

listSections() : Observable<Section[]>{
  return this.http.get<Section[]>(this.requestUri.getSections, this.headersOptions)
              // .pipe(catchError(CategoryRequestErrorHandlersService.listCategorysError));
}

updateSection(section: Section): Observable<any>{
  return this.http.put<any>(this.requestUri.updateSection, {section : section}, this.headersOptions)
            //  .pipe(catchError(CategoryRequestErrorHandlersService.putCategoryError))
}

deleteSection(id: String) : Observable<any> {
  return this.http.delete<any>(this.requestUri.deleteSection + id, this.headersOptions )
              // .pipe(catchError(CategoryRequestErrorHandlersService.))
}
}
