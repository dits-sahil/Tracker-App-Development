import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { ActionType } from 'src/app/core/constant/actionKeys';
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

  constructor(public override spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router,
     private dbService: FirebaseService, private authService: AuthService,public dialog: MatDialog,private toastrService: ToastrService) {
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
    }
  }

  get getLoggedInUserRole() {
    return this.authService.loggedInUserRole();
  }
  get getLoggedInUserId() {
    return this.authService.loggedInUserId();
  }

  getAllAssignments(): Observable<any> {
    if (this.router.url == '/manager/assignments') {
      return this.dbService.getAll('assignments', 'createdBy', this.getLoggedInUserId, 'equalTo');
    } else if (this.router.url == '/admin/assignments') {
      return this.dbService.getAll('assignments');
    } else if (this.router.url.includes('user-assignments')) {
      let userId = this.route.snapshot.params['id']
      return this.dbService.getAll('assignments', 'assignedTo', userId, 'equalTo');
    } else {
      return of(null)
    }


  }

  getAssignmentList() {
    this.showLoader();
    this.getAllAssignments().subscribe((data: any) => {
      let dbData = data.map((items: any) => {
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
      }]
    }
    arr = [...arr, {
      ...actionData, actionType: this.actionType.DETAIL
    }]
    return arr
  }

  createAssignment(evetType: string) {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '40%',
      data: {
        evetType
      }
    });
  }

  updateAssignment(id: any) {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '40%',
      data: {
        evetType:'update',
        id,
      }
    });
  }

  openDeleteAssignmentModal(id: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
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

}
