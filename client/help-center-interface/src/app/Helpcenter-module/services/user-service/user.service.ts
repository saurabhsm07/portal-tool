import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './../../classes/user';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * List of primary CRUD APIs for User data
   */
private requestUri = {
  getUserById: 'http://localhost:5000/api/users/id/',
  loginUser: 'http://localhost:5000/api/users/login',
  registerUser: 'http://localhost:5000/api/users/',
  updateUser: 'http://localhost:5000/api/users/',
  signoutUser: 'http://localhost:5000/api/users/signout',
  deleteUser: 'http://localhost:5000/api/users/',
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
 * getUser : fetches a single user based on id from the database
 * @param id : id of the user to be fetched
 */
  getUser(id: number): Observable<User> {
  return this.http.get<User>(this.requestUri.getUserById+ id.toString(), this.headersOptions)
  // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
  }

/**
 * updateUser : update a single user object based on id
 * @param user : the user information to be updated in db
 */
updateUser(user: User): Observable<any> {
  return this.http.put<any>(this.requestUri.updateUser,{ user }, this.headersOptions)
  // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));
  }

  /**
   * logoutUser: signs out user from the application
   */
  logoutUser(): Observable<any> {
    return this.http.get<any>(this.requestUri.signoutUser, this.headersOptions)
          // .pipe(catchError(CategoryRequestErrorHandlersService.postCategoryError));

  }

  /**
   * deleteUser: deletes a user record from the database based on id
   * @param id: id of the user to be deleted
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.requestUri.deleteUser + id.toString(), this.headersOptions)
    // .pipe(catchError(CategoryRequestErrorHandlersService.))
  }
}
