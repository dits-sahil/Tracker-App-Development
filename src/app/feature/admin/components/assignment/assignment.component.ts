import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { ActionType } from 'src/app/core/constant/actionKeys';
import { Common } from 'src/app/core/constant/commonKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { AddAssignmentComponent } from 'src/app/shared/components/dialogs/add-assignment/add-assignment.component';
import { ConfirmBoxComponent } from 'src/app/shared/components/dialogs/confirm-box/confirm-box.component';
import { ConfirmInviteComponent } from 'src/app/shared/components/dialogs/confirm-invite/confirm-invite.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent extends SpinnerComponent {

  assignments: any = []
  columnHeader: any =
    {
      'title': 'Title',
      'dueDate': 'Due Date',
      'priority': 'Priority',
      'createdBy': 'Created By',
      'assignedTo': 'Assigned To',
      'status': 'Status',
      'createdOn': 'Created On',
      'actions': 'Action'
    };
  inviteColumns: any = {
    'title': 'Title',
    'priority': 'Priority',
    'dueDate': 'Due Date',
    'actions': 'Action'
  }
  priority: any = {
    0: 'Low',
    1: 'Medium',
    2: 'Hign'
  }

  constructor(public override spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router,
    private dbService: FirebaseService, private authService: AuthService, public dialog: MatDialog, private toastrService: ToastrService, private sharedService:SharedService) {
    super(spinner)
  }

  ngOnInit() {
    this.getAssignmentList()
  }

  get actionType() {
    return ActionType.key
  }

  get userRole() {
    return userRoleConfig
  }
  getAssignmentDetail(id: any) {
    if (this.userRole.ADMIN == this.getLoggedInUserRole) {
      this.router.navigate(['admin', 'assignmentDetails', id]);
    } else if (this.userRole.MANAGER == this.getLoggedInUserRole) {
      this.router.navigate(['manager', 'assignmentDetails', id]);
    } else if (this.userRole.REGULARUSER == this.getLoggedInUserRole) {
      this.router.navigate(['user', 'assignmentDetails', id]);
    }
  }

  get getLoggedInUserRole() {
    return this.authService.loggedInUserRole();
  }
  get getLoggedInUserId() {
    return this.authService.loggedInUserId();
  }
  get inviteStatus() {
    return Common.inviteStatus;
  }

  getAllAssignments(): Observable<any> {
    if (this.router.url === '/manager/assignments') {
      return this.dbService.getAll('assignments', 'createdBy', this.getLoggedInUserId, 'equalTo');
    } else if (this.router.url === '/admin/assignments') {
      return this.dbService.getAll('assignments');
    } else if (this.router.url.includes('user-assignments')) {
      const userId = this.route.snapshot.params['id'];
      return this.dbService.getAll('assignments', 'assignedTo', userId, 'equalTo');
    } else if (this.router.url === '/user/assignments') {
      delete this.columnHeader.assignedTo;
      return this.dbService.getAll('assignments', 'assignedTo', this.getLoggedInUserId, 'equalTo');
    } else if (this.router.url === '/user/invites') {
      this.columnHeader = this.inviteColumns;
      return this.dbService.getAll('assignments', 'inviteStatus', this.inviteStatus.PENDING, 'equalTo');
    } else {
      return of(null);
    }
  }

  getAssignmentList() {
    this.showLoader();
    this.getAllAssignments().subscribe((data: any) => {
      let dbData = data.map((items: any) => {
        items.priority = this.priority[items.priority]
        items.dueDate = this.sharedService.convertTimeStampToDate(items.dueDate)
        items.dueDate = this.sharedService.convertISOToDate(items.dueDate)
        let actionData = {
          id: items.id
        }
        let actions = this.prepareActionType(actionData)
        items.actions = actions
        return items
      })
      this.assignments = dbData

      this.hideLoader();
    });
  }

  prepareActionType(actionData: { id: any; }) {
    const arr: any[] = [];
    const userRole = this.getLoggedInUserRole;
    const url = this.router.url;

    if (userRole === this.userRole.MANAGER) {
        arr.push(
            { ...actionData, actionType: this.actionType.DELETE },
            { ...actionData, actionType: this.actionType.UPDATE }
        );
    }

    if (userRole === this.userRole.REGULARUSER) {
        if (url === '/user/assignments') {
            arr.push({ ...actionData, actionType: this.actionType.SUBMIT });
        } else if (url === '/user/invites') {
            arr.push({ ...actionData, actionType: this.actionType.SETTINGS });
        }
    }

    arr.push({ ...actionData, actionType: this.actionType.DETAIL });
    return arr
  }

  createAssignment(eventType: string) {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '40%',
      disableClose: true,
      data: {
        eventType
      }
    });
  }

  updateAssignment(id: any) {
    console.log('id:', id)
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '40%',
      data: {
        eventType: 'update',
        id,
      }
    });
  }

  openDeleteAssignmentModal(id: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data == true) {
        this.deleteAssignment(id)
      }
    });
  }

  deleteAssignment(id: any) {
    this.dbService.delete('assignments', id)
  }

  submitAssignment(id: any) {
    this.router.navigate(['user', 'submitAssignment', id]);
  }

  assignmentSetting(id: any) {
    const dialogRef = this.dialog.open(ConfirmInviteComponent, {
      width: '25%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      this.handleInvite(id,data)
    });
  }
  handleInvite(id:any,status:any){
    let invite = status == this.inviteStatus.ACCEPTED ? this.inviteStatus.ACCEPTED : this.inviteStatus.REJECTED
    this.dbService.update('assignments', id,{inviteStatus:invite}).then(()=>{
      this.toastrService.success('Invitation status changed');
    }).catch((error)=>this.toastrService.error(error.message))
  }


}
