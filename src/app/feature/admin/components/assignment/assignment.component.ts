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
import { AddAssignmentComponent } from 'src/app/shared/components/dialogs/add-assignment/add-assignment.component';
import { ConfirmBoxComponent } from 'src/app/shared/components/dialogs/confirm-box/confirm-box.component';
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
priority:any={
  0:'Pending',
  1:'In progress',
  2:'Complete'
}

  constructor(public override spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router,
    private dbService: FirebaseService, private authService: AuthService, public dialog: MatDialog, private toastrService: ToastrService) {
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
    if (this.router.url == '/manager/assignments') {
      return this.dbService.getAll('assignments', 'createdBy', this.getLoggedInUserId, 'equalTo');
    } else if (this.router.url == '/admin/assignments') {
      return this.dbService.getAll('assignments');
    } else if (this.router.url.includes('user-assignments')) {
      let userId = this.route.snapshot.params['id']
      return this.dbService.getAll('assignments', 'assignedTo', userId, 'equalTo');
    } if (this.router.url == '/user/assignments') {
      delete this.columnHeader.assignedTo
      return this.dbService.getAll('assignments', 'assignedTo', this.getLoggedInUserId, 'equalTo');
    } if (this.router.url == '/user/invites') {
      this.columnHeader = this.inviteColumns;
      return this.dbService.getAll('assignments', 'inviteStatus', this.inviteStatus.PENDING, 'equalTo');
    }
    else {
      return of(null)
    }


  }

  getAssignmentList() {
    this.showLoader();
    this.getAllAssignments().subscribe((data: any) => {
      let dbData = data.map((items: any) => {
        items.priority=this.priority[items.priority]
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
    let arr: any = []
    if (this.getLoggedInUserRole == this.userRole.MANAGER) {
      arr = [...arr,
      {
        ...actionData, actionType: this.actionType.DELETE
      },
      {
        ...actionData, actionType: this.actionType.UPDATE
      },
      {
        ...actionData, actionType: this.actionType.DETAIL
      }]
    } 
    
    if (this.getLoggedInUserRole == this.userRole.REGULARUSER  && this.router.url == '/user/assignments') {
      arr = [...arr,
      {
        ...actionData, actionType: this.actionType.SUBMIT
      },
      {
        ...actionData, actionType: this.actionType.DETAIL
      }]
    }
    if ((this.getLoggedInUserRole == this.userRole.REGULARUSER) && this.router.url == '/user/invites'){
      arr = [...arr,
        {
          ...actionData, actionType: this.actionType.SETTINGS
        },
        {
          ...actionData, actionType: this.actionType.DETAIL
        }]
    }
    
    return arr
  }

  createAssignment(evetType: string) {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '40%',
      disableClose: true,
      data: {
        evetType
      }
    });

  }

  updateAssignmentDetail(id: any) { }

  openDeleteAssignmentModal(id: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      console.log('data:', data)
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

  assignmentSetting(id:any){

  }
}
