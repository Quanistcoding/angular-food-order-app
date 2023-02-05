import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap, map } from 'rxjs';
import { User } from '../models/user.model';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate() {
    return this.authService.auth.user
      .pipe(
        switchMap((user): any => {
          if (!user) return false;
          const id = user?.uid;
          return this.userService.findOne(id).valueChanges();
        })
      )
      .pipe(map((user) => ((user as User).isAdmin ? true : false)));
  }
}
