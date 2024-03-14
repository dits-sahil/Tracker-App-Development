import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  constructor(private route: ActivatedRoute, private dbService: FirebaseService,private router: Router) {
    this.userId = route.snapshot.params['id']
  }
  get userRole():any{
    return userRoleConfig
  }
  userId = '';
  userData:any;

  ngOnInit() {
    this.getUserDetail(this.userId);
  }

  getUserDetail(id: any) {
    this.dbService.getDataById('users', this.userId).subscribe((userData: any) => {
      this.userData = userData;
    })
  }

  userList(){
    this.router.navigate(['admin','userList',this.userId]);
  }
  assignmentList(){
    this.router.navigate(['admin','assignments',this.userId]);
  }

}
