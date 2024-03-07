import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { StorageKeys } from 'src/app/core/constant/storageKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() inputIsExpand: boolean = true
  @Output() getExpandSidebar = new EventEmitter<boolean>();
  role: any;
  UserDetails: any;
  totalOnline: any;
  positionNumber: any;
  sidebar: boolean = true;
  private _subscriptions: Subscription = new Subscription();
  patientId!: string | null;

  constructor(private auth: AuthService, private eventService: SharedService, private router: Router, private storageService: StorageService, private route: ActivatedRoute) {
    let profile: any = storageService.getStorage(StorageKeys.keys.USERDETAIL);
    profile = JSON.parse(profile)
    this.role = profile.role
  }

  public get userRoleConfig(): any {
    return userRoleConfig
  }

  ngOnInit() {

    if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.inputIsExpand = false;
    } else {
      this.inputIsExpand = true;
    }
    if (window.innerWidth > 767) {
      this.eventService.showHideSidebar.subscribe(res => {
        this.inputIsExpand = res;
      })
    }
  }


  hideSideBar() {
    this.inputIsExpand = false
    this.getExpandSidebar.emit(this.inputIsExpand)
  }

  showSideBar() {
    this.inputIsExpand = true
    this.getExpandSidebar.emit(this.inputIsExpand)
  }

  imageClick() {
    this.router.navigate(['/']);
  }

}


