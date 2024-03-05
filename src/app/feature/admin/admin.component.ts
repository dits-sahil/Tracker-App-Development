import { Component } from '@angular/core';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private sidenav: SidenavService){

  }
  toggleSidebar() {
    // Handle opening/closing of sidebar
  }

  closeSidebar() {
    // Handle closing of sidebar
  }
  
  ngOnInit(){
  }
}
