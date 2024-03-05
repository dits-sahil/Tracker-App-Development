import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router:Router){
    // router.navigate(['admin','users'])
  }
 
}
