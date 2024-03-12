import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-m-assignment-list',
  templateUrl: './m-assignment-list.component.html',
  styleUrls: ['./m-assignment-list.component.scss']
})
export class MAssignmentListComponent {

  columnHeadings = ['index', 'title', 'description', 'dueDate', 'priority', 'status', 'actions'];
  showPopupBox: boolean = false;
  users: any[] = [];
  uid: any;
  constructor(private firebaseService: FirebaseService,) { }
  ngOnInIt() {
    this.getUserData(this.uid);
    this.getAssignmentTableData()


  }
  async getUserData(id: any) {
    debugger
    // await this.updateDeviceToken(userId)
    this.firebaseService.getAll('users').subscribe((data: any[]) => {
      this.users = data;
      console.log(' this.users ', this.users )
    });
  }
  openManageAssignmentPopup() {
    this.showPopupBox = true;
  }
  closeDialog(isChanged: any) {
    if (isChanged) { }
    this.showPopupBox = false;

  }
  getAssignmentTableData() {

    // let userId = user.user.uid
  }

  // let userId = user.user.uid
  // // await this.updateDeviceToken(userId)
  // this.dbService.getAll(`users/${userId}`).subscribe((data: any) => {
  //   let finalData = this.dbService.convertToObject(data)
  //   let accessToken = user.user.accessToken
  //   finalData = { ...finalData, accessToken }
  //   this.storageService.setStorage('user', finalData)
  //   this.router.navigate(['/', 'home']);
  //   this.toastrService.success('User logged in successfuly');
  // });
}


