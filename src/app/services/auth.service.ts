import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserService } from './user.service';
import { Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private userService: UserService) {}

  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        const user = response.user;
        if (!user) return;
        const userData = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
        };

        this.userService.findOneAndUpdate(user.uid, userData);
      });
  }

  logout() {
    this.auth.signOut();
  }

  get user() {
    return this.auth.user.pipe(
      switchMap((user): Observable<User> => {
        return this.userService
          .findOne((user as firebase.User).uid)
          .valueChanges() as Observable<User>;
      })
    );
  }
}
