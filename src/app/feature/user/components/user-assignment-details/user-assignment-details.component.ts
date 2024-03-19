import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-user-assignment-details',
  templateUrl: './user-assignment-details.component.html',
  styleUrls: ['./user-assignment-details.component.scss']
})
export class UserAssignmentDetailsComponent extends SpinnerComponent {
  assignmentId = '';
  assignmentData:any;
  userData: any;

  constructor(public override spinner: NgxSpinnerService,private route: ActivatedRoute, private dbService: FirebaseService,public dialog: MatDialog) {
    super(spinner)
    this.assignmentId = route.snapshot.params['id']
  }

  ngOnInit() {
    this.getAssignmentDetail(this.assignmentId);
  }

  getAssignmentDetail(id: any) {
    this.showLoader()
    this.dbService.getDataById('assignments', this.assignmentId).subscribe((assignmentData: any) => {
      this.assignmentData = assignmentData;
      console.log('assignmentData:', assignmentData)
      this.dbService.getDataById('users', this.assignmentData?.createdBy).subscribe((userData: any) => {
        this.userData = userData;
        console.log('userData:', userData)
      })
      this.hideLoader();
    });
  }

}
