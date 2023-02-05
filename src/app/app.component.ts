import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'food-order';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.auth.user.subscribe((user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
        };

        this.userService.findOneAndUpdate(user.uid, userData);
      }
    });
  }
}
