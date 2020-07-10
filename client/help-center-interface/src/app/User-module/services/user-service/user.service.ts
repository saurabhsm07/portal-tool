import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../class/user';
import { User_Organizations } from '../../class/user_organizations';
import { Observable } from 'rxjs';
import { Organization_Products } from './../../class/organization_products';

@Injectable({
  providedIn: 'root'
})
export class UserService {


   public serverDomain = 'http://localhost:5000/' //base url of the server (UN-BUILD)
  //public serverDomain = '' //base url of the server (BUILD)

  /**
   * List of primary CRUD APIs for User data
   */
private requestUri = {
  createUser: this.serverDomain + 'api/users',
  getUserById: this.serverDomain + 'api/users/id/',
  updateUser: this.serverDomain + 'api/users/',
  signoutUser: this.serverDomain + 'api/users/signout',
  deleteUser: this.serverDomain + 'api/users/',
  getUserOrgs: this.serverDomain + 'api/users/organizations',
  getOrgsProducts: this.serverDomain + 'api/users/products/organizationids/'
};

private headersOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
})
};

constructor(private http: HttpClient) { }



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


/**
 * getUserOrgs: get organization ids for a logged in user
 */
getUserOrgs(): Observable<User_Organizations>{
  return this.http.get<User_Organizations>(this.requestUri.getUserOrgs, this.headersOptions);
}

/**
 * getOrgProducts: get organization ids and product ids
 */
getOrgProducts(organization_ids : number[]): Observable<Organization_Products[]>{
  return this.http.get<Organization_Products[]>(this.requestUri.getOrgsProducts + organization_ids.toString(), this.headersOptions);
}

isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getUserId(): number{
    const user = JSON.parse(localStorage.getItem('user'));
    return user.id;
  }

  getUserName(): string{
    const user = JSON.parse(localStorage.getItem('user'));
    return user.name;
  }

  getOrganizationIds(): number[]{
    const organization_ids = JSON.parse(localStorage.getItem('organizations'));
    return organization_ids;
  }


}
