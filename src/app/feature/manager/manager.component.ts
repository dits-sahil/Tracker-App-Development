import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {
  isExpand: boolean = true;
  loading: boolean = false;
  constructor(private router:Router){
    // router.navigate(['manager','users'])
  }
  public expandOffItem(inExpand: boolean) {
    this.isExpand = inExpand
  }

}
