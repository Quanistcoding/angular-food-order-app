import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user$: Observable<firebase.User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.auth.user;
  }

  logout() {
    const logoutConfirm = confirm('Are you sure you want to log out?');
    if (logoutConfirm) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}
