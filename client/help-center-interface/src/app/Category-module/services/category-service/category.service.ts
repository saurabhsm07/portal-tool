import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../../classes/category';
import { CategoryRequestErrorHandlersService } from '../error-handlers/category-request/category-request-error-handlers.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
  //public serverDomain = '' //base url of the server (BUILD)
  
  /**
   * List of primary CRUD APIs for Category data
   */
  private requestUri = {
    getCategories: this.serverDomain + 'api/categories/',
    getCategoryById: this.serverDomain + 'api/categories/id/',
    postCategory: this.serverDomain + 'api/categories/',
    updateCategory: this.serverDomain + 'api/categories/',
    deleteCategory: this.serverDomain + 'api/categories/',
  };

  private headersOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * postCategory: saves a category object to the database
   * @param category : category object to be saved in the database
   */
  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.requestUri.postCategory, { category: category }, this.headersOptions)
      .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
  }

  /**
   * getCategory: gets a single category based on id
   * @param id : unique id of the category
   */
  getCategory(id: String): Observable<Category> {
    return this.http.get<Category>(this.requestUri.getCategoryById + id, this.headersOptions)
      .pipe(catchError(CategoryRequestErrorHandlersService.getCategoryError));
  }

  /**
   * 
   */
  listCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.requestUri.getCategories, this.headersOptions)
      .pipe(catchError(CategoryRequestErrorHandlersService.listCategoriesError));
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put<any>(this.requestUri.updateCategory, { category: category }, this.headersOptions)
      .pipe(catchError(CategoryRequestErrorHandlersService.putCategoryError))
  }

  deleteCategory(id: String): Observable<any> {
    return this.http.delete<any>(this.requestUri.deleteCategory + id, this.headersOptions)
    // .pipe(catchError(CategoryRequestErrorHandlersService.))
  }
}
