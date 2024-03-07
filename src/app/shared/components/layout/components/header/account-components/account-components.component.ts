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

  constructor(private router: Router, private loacalService: StorageService, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    let getUserDetail: any = changes['UserDetails'].currentValue
    this.currentUserId = getUserDetail.id
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
