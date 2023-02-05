import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user?: firebase.User | null;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.auth.user.subscribe((user) => {
      this.user = user;
    });

    if (this.user) {
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
