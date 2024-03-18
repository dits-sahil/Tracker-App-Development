import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-account-components',
  templateUrl: './account-components.component.html',
  styleUrls: ['./account-components.component.scss']
})
export class AccountComponentsComponent {
  @Input() userDetails: any
 

  constructor(private authService: AuthService) { }
  ngOnInit() {
  }
  loggedUser(){
    this.userDetails = this.authService.loggedInUser()
  }

  logout() {
    this.authService.logout();
  }
}
