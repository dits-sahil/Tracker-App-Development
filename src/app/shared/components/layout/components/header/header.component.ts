import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router:Router,private readonly firebaseService: AuthService, public header:SidenavService,  ) { }
  @Output() SideNavToggle = new EventEmitter();
  inputIsExpand!: boolean;
  dashboardHamburger: boolean = true;
  UserDetails:any;
  @Output() getExpandSidebar = new EventEmitter<boolean>();
  role='Admin'
  hideSideBar() {
    this.inputIsExpand = false
    this.header.showHideSidebar.next(false);
    this.getExpandSidebar.emit(this.inputIsExpand);
  }

  showSideBar() {
    this.inputIsExpand = true
    this.header.showHideSidebar.next(true);
    this.getExpandSidebar.emit(this.inputIsExpand);
  }
logout() {
  this.firebaseService
    .logout()
    .then(() => this.router.navigate(['/', 'login']));
}

 imageClick() {

  }
}
