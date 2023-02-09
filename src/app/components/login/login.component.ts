import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.auth.user.subscribe((user) => {
      if (user) {
        const { returnUrl } = this.route.snapshot.queryParams;
        if (returnUrl) this.router.navigate([returnUrl]);
        else this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.authService.login();
  }
}
