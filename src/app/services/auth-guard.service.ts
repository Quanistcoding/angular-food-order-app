import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user?: firebase.User | null;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.auth.user.pipe(
      map((user: any) => {
        this.user = user;
        if (this.user) {
          return true;
        }
        this.router.navigate(['login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
