import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly firebaseService: AuthService,
    private readonly router: Router
  ) {}
  logout() {
    this.firebaseService
      .logout()
      .then(() => this.router.navigate(['/', 'login']));
  }
}
