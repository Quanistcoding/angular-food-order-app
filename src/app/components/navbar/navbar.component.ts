import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$?: Observable<User>;
  cart$?: Observable<Product[]>;
  total?: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ cart: Product[] }>
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user;
    this.store.select('cart').subscribe((cart) => {
      this.total = cart.reduce((s, c) => s + c.amount!, 0);
    });
  }

  logout() {
    const logoutConfirm = confirm('Are you sure you want to log out?');
    if (logoutConfirm) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}
