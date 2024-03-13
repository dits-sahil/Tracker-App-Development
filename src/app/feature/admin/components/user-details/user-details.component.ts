import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

  userId = '';
  userData:any;

  ngOnInit() {
    this.getUseeDetail(this.userId);
  }

  getUseeDetail(id: any) {
    this.dbService.getDataById('users', this.userId).subscribe((userData: any) => {
      this.userData = userData;
      console.log('userData:', this.userData)
    })
  }

  userList(){
    this.router.navigate(['admin','userList']);
  }

}
