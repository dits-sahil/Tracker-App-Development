import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-account-components',
  templateUrl: './account-components.component.html',
  styleUrls: ['./account-components.component.scss']
})
export class AccountComponentsComponent {
  @Input() UserDetails: any
  role: any;
  currentUserId: any
  UserName: any;
  userDetails: any

  constructor(private router: Router, private loacalService: StorageService, private authService: AuthService) { }
  ngOnInit() {

  }
  loggedUser(){
    this.UserDetails = this.authService.loggedInUser()
  }

  logout() {
    this.authService.logout();
  }
}
