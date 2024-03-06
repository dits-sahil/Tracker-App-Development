import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/core/services/shared.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  loginDetails:any;
  isExpand: boolean = true;
  loading: boolean = false;
  constructor(private router:Router,private sharedService:SharedService){
    router.navigate(['admin','users'])
  }
  private _subscriptions: Subscription = new Subscription()
  ngOnInit() {
    if (window.innerWidth < 992) {
      this.isExpand = false
    } else {
      this.isExpand = true
    }
    this._subscriptions.add(this.sharedService.showHideSidebar.subscribe((res) => {
      this.isExpand = res;
    }));
  }
  public expandOffItem(inExpand: boolean) {
    this.isExpand = inExpand
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }


}
