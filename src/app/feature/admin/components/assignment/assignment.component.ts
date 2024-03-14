import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { ActionType } from 'src/app/core/constant/actionKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
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

    constructor(public override spinner: NgxSpinnerService,private route: ActivatedRoute, private router: Router, private dbService: FirebaseService,private authService: AuthService) { 
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
      if(this.userRole.ADMIN ==this.getLoggedInUserRole){
    this.router.navigate(['admin', 'assignmentDetails', id]);
      } else if(this.userRole.MANAGER ==this.getLoggedInUserRole){
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
    if (this.router.url=='/manager/assignments') {
      return this.dbService.getAll('assignments','createdBy',this.getLoggedInUserId, 'equalTo');
    } else if(this.router.url=='/admin/assignments') {
      return this.dbService.getAll('assignments');
    } else if(this.router.url.includes('user-assignments')) {
      let userId = this.route.snapshot.params['id']
      return this.dbService.getAll('assignments','assignedTo',userId,'equalTo');
    }else {
      return of(null)
    }
    
   
  }

  getAssignmentList() {
    this.showLoader();
    this.getAllAssignments().subscribe((data: any) => {
      let dbData = data.map((items: any) => {
        let actionData = {
          uid: items.id
        }
        let actions = this.prepareActionType(actionData)
        items.actions = actions
        return items
      })
      this.assignments = dbData
      this.hideLoader();
    });
  }

  prepareActionType(actionData: { uid: any; }) {
    return [
      {
        ...actionData, actionType: this.actionType.DETAIL
      }
    ];
  }

  createAssignment(evetType: string){
    
  }
}
