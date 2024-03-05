import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private router:Router){
    router.navigate(['user','assignments'])
  }
  toggleSidebar() {
    // Handle opening/closing of sidebar
  }

  closeSidebar() {
    // Handle closing of sidebar
  }
}
