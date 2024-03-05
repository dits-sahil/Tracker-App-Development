import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private _router: Router,private readonly firebaseService: AuthService,) { }
  userDetails = 'Tracker Appp';

  ngOnInit(): void {
  }
  routeToHome() {
    this._router.navigate(['login'])
  }

  onLogoutClick() {
    // this._helper.logout();
  }
  logout() {
    this.firebaseService
      .logout()
      .then(() => this._router.navigate(['/', 'login']));
  }
}
