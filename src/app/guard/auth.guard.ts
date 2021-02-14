import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let temp = localStorage[LoginService.tokenKey];

    console.log(localStorage[LoginService.tokenKey]);

    if (localStorage[LoginService.tokenKey] == undefined) {
      this.router.navigate(['/login']);
      return false;
    }

    if (localStorage[LoginService.tokenKey] != 'null') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
