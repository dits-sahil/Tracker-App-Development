import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { ActionType } from 'src/app/core/constant/actionKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AddUserComponent } from 'src/app/shared/components/dialogs/add-user/add-user.component';
import { ConfirmBoxComponent } from 'src/app/shared/components/dialogs/confirm-box/confirm-box.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  columnHeader = { 'name': 'Name', 'email': 'Email', 'phoneNumber': 'Phone Number', 'noOfAssignments': 'No. of Assignments', 'role': 'User Type' , 'actions': 'Action' };
  loggedInUserRole!:any
  users: any = []
  constructor(public dialog: MatDialog, private dbService: FirebaseService, private authService:AuthService,private toastrService:ToastrService) { }
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
  createUser(evetType:string) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      data: {
        evetType,
        userRole:this.loggedInUserRole
      }
    });
  }
  updateUserDetail(id: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      data: {
        id,
        evetType:'update',
        userRole:this.loggedInUserRole,
      }
    })
  }
  getUsersList() {
    this.dbService.getAll('users', 'role', userRoleConfig.ADMIN, 'notEqualTo').subscribe((data: any) => {
      let dbData = data.map((items: any, index: any) => {
        delete items.deviceToken
        delete items.accessToken
        let actionData = {
          uid: items.uid
        }
        let actions = this.prepareActionType(actionData)
        items.actions = actions
        let userType = items.role
        userType = userType == this.userRole.MANAGER ? 'Manager' : userType == this.userRole.REGULARUSER ? 'Regular User' : userType == this.userRole.ADMIN ? '' : 'N/A'
        items.role = userType
        return items
      })
      this.users =dbData
    });
  }
  prepareActionType(actionData: { uid: any; }) {
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
  openDeleteUserModal(id: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
    }).afterClosed().subscribe(data => {
      if (data == true) {
        this.deleteUser(id)
      }
    });
  }
  deleteUser(id:any){
    this.dbService.delete('users',id)
    this.dbService.delete('manager',id)
    this.dbService.delete('regularUsers',id)
    this.toastrService.success('User deleted successfully')
  }

}
