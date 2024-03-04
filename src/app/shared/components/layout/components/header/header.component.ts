import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _router:Router) { }
  userDetails = 'Tracker Appp';

  ngOnInit(): void {
  }
  routeToHome() {
    this._router.navigate(['login'])
  }

  onLogoutClick() {
    // this._helper.logout();
  }
}
