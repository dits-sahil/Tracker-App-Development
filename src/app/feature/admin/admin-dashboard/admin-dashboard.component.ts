import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <p>Congratulation ! You have logged in successfully !</p>
    <button mat-flat-button color="primary" (click)="logout()">Logout</button>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

  logout() {
    this.firebaseService
      .logout()
      .then(() => this.router.navigate(['/', 'admin']));
  }

}
