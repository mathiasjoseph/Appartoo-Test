import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class InverseAuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (AuthService.getToken()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
