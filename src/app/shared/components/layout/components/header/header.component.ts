import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { StorageKeys } from 'src/app/core/constant/storageKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  headerDetails: any;
  userName!: string;
  userDetails: any;
  storageDetails: any;
  role: any;
  inputIsExpand: boolean | undefined;
  @Output() getExpandSidebar = new EventEmitter<boolean>();
  patientId!: string | null;
  dashboardHamburger: boolean = true;
  constructor(private loacalService: StorageService, private auth: AuthService, private shared: SharedService, private router: Router, private route: ActivatedRoute) {
   
   
  }

  public get userRoleConfig(): any {
    return userRoleConfig
  }

  getUserDetail(){
    this.auth.getProfileDetails().subscribe((res:any) => {
    let profile =res;
    this.userName =profile.name;
    this.role = profile.role;
    this.headerDetails = profile;
    console.log('res:', res)
     } )
  }

  ngOnInit() {
    this.getUserDetail();
    // if (window.innerWidth < 991) {
      if (window.innerWidth >= 768 && window.innerWidth < 991 ) {
      this.inputIsExpand = false
      this.shared.showHideSidebar.next(false);
    } else {
      this.inputIsExpand = true
      this.shared.showHideSidebar.next(true);
    }


  }

  hideSideBar() {
    this.inputIsExpand = false
    this.shared.showHideSidebar.next(false);
    this.getExpandSidebar.emit(this.inputIsExpand);
  }

  showSideBar() {
    this.inputIsExpand = true
    this.shared.showHideSidebar.next(true);
    this.getExpandSidebar.emit(this.inputIsExpand);
  }

  logout() {
    this.loacalService.clear();
  }
  imageClick(){
    this.router.navigateByUrl('/')
  }
}
