import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './../../classes/user';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private requestUri = {
    loginUser: 'http://localhost:5000/api/users/login',
    registerUser: 'http://localhost:5000/api/users/',
  };
  private headersOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
  };

  constructor(private http: HttpClient) { }

  /**
 * register user: saves user object in the database and registers the user with the web application
 * @param user : user object to be saved and registered with the web application
 */
registerUser(user: User): Observable<User> {
  return this.http.post<User>(this.requestUri.registerUser, {user}, this.headersOptions)
  // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
  
  }
  
  /**
   * login user: saves user object in the database and registers the user with the web application
   * @param user : user object to be used for authenticating the user with the web application
   */
  loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.requestUri.loginUser, {user}, this.headersOptions)
    // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
    
    }

    /**
     * Returns true if a user login in token exists
     */
    isLoggedIn(){
      return !!localStorage.getItem('token');
    }

    /**
     * Returns currently logged in user
     */
    getToken(){
      return localStorage.getItem('token'); 
    }

}
