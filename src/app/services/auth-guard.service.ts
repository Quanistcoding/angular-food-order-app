import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user?: firebase.User | null;
  constructor(private authService: AuthService) {}

  canActivate() {
    this.authService.auth.user.subscribe((user) => {
      this.user = user;
    });

    if (this.user) return true;
    return false;
  }
}
