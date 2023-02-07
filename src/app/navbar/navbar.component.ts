import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$?: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.user;
  }

  logout() {
    const logoutConfirm = confirm('Are you sure you want to log out?');
    if (logoutConfirm) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}
