import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private requestUri = {
    loginUser: 'http://localhost:5000/api/users/login',
    logoutUser: 'api/users/logout',
    registerUser: 'api/users/',
    authorizedAdmin: 'api/users/auth/admin',
    authorizedAgent: 'api/users/auth/agent',
    authorizedCustom: 'api/users/auth/custom'
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
    return this.http.post<User>(this.requestUri.loginUser, {user}, this.headersOptions);
    // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
    
    }

  
 /**
   * login user: saves user object in the database and registers the user with the web application
   * @param user : user object to be used for authenticating the user with the web application
   */
  logoutUser(): Observable<any> {
    return this.http.get<any>(this.requestUri.logoutUser, this.headersOptions);
    // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
    
    }

        /**
     * Returns true if a user user has agent autherization
     */
    isAdmin(): Observable<any> {
      return this.http.get<any>(this.requestUri.authorizedAdmin, this.headersOptions);
    }

    /**
     * Returns true if a user user has agent autherization
     */
    isAgent(): Observable<boolean> {
      return this.http.get<boolean>(this.requestUri.authorizedAgent, this.headersOptions);
    }
    
    /**
     * Returns true if a user has custom role autherization
     */
    isCustomAuthorized(): Observable<boolean> {
      return this.http.get<boolean>(this.requestUri.authorizedCustom, this.headersOptions);
    }

    /**
     * Returns true if a user login in token exists
     */
    isLoggedIn(){
      return !!localStorage.getItem('token');
    }

    /**
     * Removes jwt token used for authentication
     */
    removeAuthTokens(){
      try{
        localStorage.clear();
        return true;
      }catch (error){
        console.log('error while clearing tokens');
        console.log(error);
        return false;
      }
      
    }

    

    /**
     * Returns currently logged in user token
     */
    getToken(){
      return localStorage.getItem('token'); 
    }

}
