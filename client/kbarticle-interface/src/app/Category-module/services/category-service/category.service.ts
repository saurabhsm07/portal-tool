import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Category } from './../../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /**
   * List of primary CRUD APIs for Category data
   */
private requestUri = {
    getCategories: 'http://localhost:5000/api/categories/',
    getCategoryById: 'http://localhost:5000/api/categories/id/',
    postCategory: 'http://localhost:5000/api/categories/',
    updateCategory: 'http://localhost:5000/api/categories/',
    deleteCategory: 'http://localhost:5000/api/categories/',
};

private headersOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
})
};

  constructor(private http: HttpClient) { }

  postCategory({category: Category}) : Observable<Category> {
    return this.http.post<Category>(this.requestUri.postCategory, {category : Category}, this.headersOptions)
        // .pipe(catchError());
  }

  getCategory(id : String) : Observable<Category> {
    return this.http.get<Category>(this.requestUri.getCategoryById+id, this.headersOptions)
              //  .pipe(catchError(CategoryRequestErrorHandlersService.getCategoryError));
  }

  listCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(this.requestUri.getCategories, this.headersOptions)
                // .pipe(catchError(CategoryRequestErrorHandlersService.listCategorysError));
  }

  updateCategory({category: Category}): Observable<Category>{
    return this.http.put<Category>(this.requestUri.updateCategory, {category : Category}, this.headersOptions)
              //  .pipe(catchError(CategoryRequestErrorHandlersService.putCategoryError))
  }

  deleteCategory(id: String) : Observable<any> {
    return this.http.delete<any>(this.requestUri.deleteCategory + id, this.headersOptions )
                // .pipe(catchError(CategoryRequestErrorHandlersService.))
  }
}
