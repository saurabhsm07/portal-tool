import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './../../../Helpcenter-module/services/auth-service/auth.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }
  canActivate() {
    return this.authService.isAgent().pipe(
      map((data) => {
        console.log(data);
        if (data == false) { this.router.parseUrl('/guide/unauthorized/access'); return false } else { return true }
      }),
      catchError((err) => {
        console.log(err)
        this.router.navigate(['/guide/unauthorized/access'])
        return of(false)
      })
    )
  }
}
