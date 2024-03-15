import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { ActionType } from 'src/app/core/constant/actionKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { DetailComponent } from 'src/app/shared/components/detail/detail.component';
import { AddUserComponent } from 'src/app/shared/components/dialogs/add-user/add-user.component';
import { ConfirmBoxComponent } from 'src/app/shared/components/dialogs/confirm-box/confirm-box.component';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends SpinnerComponent {
  columnHeader = { 'name': 'Name', 'email': 'Email', 'phoneNumber': 'Phone Number', 'noOfAssignments': 'No. of Assignments', 'role': 'User Type', 'actions': 'Action' };
  loggedInUserRole!: any
  loggedInUserId!: any
  users: any = []
  constructor(public dialog: MatDialog, private dbService: FirebaseService, private authService: AuthService, private route: ActivatedRoute,
    private toastrService: ToastrService, private router: Router,public override spinner: NgxSpinnerService) {
      super(spinner)
     }
  ngOnInit() {
    this.getLoggedInUserRole();
    this.getLoggedInUserId();
    this.getUsersList();
  }
  get actionType() {
    return ActionType.key
  }
  get userRole() {
    return userRoleConfig
  }

  getLoggedInUserRole() {
    this.loggedInUserRole = this.authService.loggedInUserRole();
  }
  getLoggedInUserId() {
    this.loggedInUserId = this.authService.loggedInUserId();
  }
  createUser(evetType: string) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      disableClose: true,
      data: {
        evetType,
        userRole: this.loggedInUserRole
      }
    });
  }
  updateUserDetail(id: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      disableClose: true,
      data: {
        id,
        evetType: 'update',
        userRole: this.loggedInUserRole,
      }
    })
  }

  getAllUsers(): Observable<any> {

    if (this.router.url == '/admin/users') {
      return this.dbService.getAll('users', 'role', userRoleConfig.ADMIN, 'notEqualTo');
    } else if (this.router.url == '/manager/users') {
      return this.dbService.getAll('users', 'parent', this.loggedInUserId, 'equalTo');
    } else if (this.router.url.includes('userList')) {
      let userId = this.route.snapshot.params['id']
      return this.dbService.getAll('users', 'parent', userId, 'equalTo');
    } else {
      return of(null);
    }
  }
  getUsersList() {
    this.showLoader();
    this.getAllUsers().subscribe((data: any) => {
      let dbData = data.map((items: any, index: any) => {
        delete items.deviceToken
        delete items.accessToken
        let actionData = {
          id: items.uid
        }
        let actions = this.prepareActionType(actionData)
        items.actions = actions
        let userType = items.role
        userType = userType == this.userRole.MANAGER ? 'Manager' : userType == this.userRole.REGULARUSER ? 'Regular User' : userType == this.userRole.ADMIN ? '' : 'N/A'
        items.role = userType
        return items
      })
      this.users = dbData
      this.hideLoader();
    });
  }
  prepareActionType(actionData: { id: any; }) {
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
    if (this.router.url == '/admin/users') {
    this.router.navigate(['admin', 'userDetails', id]);
    } else if(this.router.url == '/manager/users'){
      this.router.navigate(['manager', 'userDetails', id]);
    }
  }

  getUserData(id: any): Observable<any> {
    return this.dbService.getDataById('users', id);
  }
  openDeleteUserModal(id: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data == true) {
        this.deleteUser(id)
      }
    });
  }
  deleteUser(id: any) {
    this.dbService.delete('users', id)
    this.authService.deleteUser(id).subscribe({
      next: (res) => {
        console.log('res:', res)
        this.toastrService.success('User deleted successfully')
      },
      error:(err:any)=> {
        this.toastrService.error(err.message)
      }
    })
  }

}
// 51 52 35 36 30 34
