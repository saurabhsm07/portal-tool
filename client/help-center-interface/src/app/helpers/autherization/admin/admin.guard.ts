import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../../Helpcenter-module/services/auth-service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router){}
  canActivate(): Observable <boolean>  {
     return this.authService.isAdmin()
   }
  
}
