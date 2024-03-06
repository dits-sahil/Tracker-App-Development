import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  loginDetails:any;
  isExpand: boolean = true;
  constructor(private router:Router){
    router.navigate(['admin','users'])
  }
  ngOnInit(){
    this.loginDetails = localStorage.getItem('user');
    const storedItems = JSON.parse(this.loginDetails.getItem('dataSource'));
    console.log(this.loginDetails.role)
  }
  public expandOffItem(inExpand: boolean) {
    this.isExpand = inExpand
  }

}
