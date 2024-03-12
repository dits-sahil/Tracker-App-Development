import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { MatDialog } from '@angular/material/dialog';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { ActionType } from 'src/app/core/constant/actionKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AddUserComponent } from 'src/app/shared/components/dialogs/add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  columnHeader = { 'name': 'Name', 'email': 'Email', 'phoneNumber': 'Phone Number', 'noOfAssignments': 'No. of Assignments', 'role': 'User Type' , 'actions': 'Action' };
  loggedInUserRole!:any
  users: any = []
  constructor(public dialog: MatDialog, private dbService: FirebaseService, private authService:AuthService) { }
  ngOnInit() {
    this.getUsersList();
    this.getLoggedInUserRole();

  }
  get actionType() {
    return ActionType.key
  }
  get userRole() {
    return userRoleConfig
  }
  getLoggedInUserRole(){
    this.loggedInUserRole = this.authService.loggedInUserRole();
  }
  openUserModal(evetType:string) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      data: {
        evetType,
        userRole:this.loggedInUserRole
      }
    });
  }
  getUsersList() {
    this.dbService.getAll('users', 'role', 1, 'notEqualTo').subscribe((data: any) => {
      let dbData = data.map((items: any, index: any) => {
        delete items.deviceToken
        delete items.accessToken
        let actionData = {
          uid: items.uid
        }
        let actions = this.prepareActionType(actionData)
        console.log('actions:', actions)
        items.actions = actions
        let userType = items.role
        userType = userType == this.userRole.MANAGER ? 'Manager' : userType == this.userRole.REGULARUSER ? 'Regular User' : userType == this.userRole.ADMIN ? '' : 'N/A'
        items.role = userType
        return items
      })
      this.users = dbData
      console.log(' this.users:',  this.users)
    });
  }

  private prepareActionType(actionData: { uid: any; }) {
    return [
      {
        ...actionData, actionType: this.actionType.DELETE
      },
      {
        ...actionData, actionType: this.actionType.UPDATE
      },
      {
        ...actionData, actionType: this.actionType.DETAIL
      }
    ];
  }

  getUserDetail(id: any) {
    console.log('id:', id)

  }
  updateUserDetail(id: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      data: {
        evetType:'update',
        userRole:this.loggedInUserRole,
        updateAction: this.submitUpdatedDetails.bind(this)
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  submitUpdatedDetails(){
    console.log('sds');
  }
  deleteUser(id: any) {
    console.log('id:', id)
  }
}
