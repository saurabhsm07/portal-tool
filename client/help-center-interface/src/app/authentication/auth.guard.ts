import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from './../Helpcenter-module/services/auth-service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
          private router: Router){}

          canActivate(): boolean {
             if(this.authService.isLoggedIn()){
               return true;
             }
             else{
               this.router.navigate(['/hc/en-us/home'])
               return false;
             }
          }
  
}
