import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-assignmnet-details',
  templateUrl: './assignmnet-details.component.html',
  styleUrls: ['./assignmnet-details.component.scss']
})
export class AssignmnetDetailsComponent {

  constructor(private route: ActivatedRoute, private dbService: FirebaseService,private toastrService: ToastrService) {
    this.assignmentId = route.snapshot.params['id']
  }
 
  assignmentId = '';
  assignmentData:any;

  ngOnInit() {
    this.getAssignmentDetail(this.assignmentId);
  }

  getAssignmentDetail(id: any) {
    this.dbService.getDataById('assignments', this.assignmentId).subscribe({
      next: (assignmentData: any) => {
      this.assignmentData = assignmentData;
      },
      error:(err:any)=> {
        this.toastrService.error(err.message)
      }
    })
  }

}
