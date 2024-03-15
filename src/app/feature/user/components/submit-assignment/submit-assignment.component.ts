import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Common } from 'src/app/core/constant/commonKeys';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.scss']
})
export class SubmitAssignmentComponent extends SpinnerComponent {

  submitAssignmentForm!: FormGroup;
  assignmentId = '';
  assignmentData:any;
  userData: any;

  constructor(public override spinner: NgxSpinnerService,private route: ActivatedRoute, 
    private dbService: FirebaseService,private validationService: ValidationService) {
    super(spinner)
    this.assignmentId = route.snapshot.params['id']
  }

  ngOnInit() {
    this.getAssignmentDetail(this.assignmentId);

    this.submitAssignmentForm = new FormGroup({
      assignment: new FormControl<string>('', [
        Validators.required,
      ]),
    });
  }

  getAssignmentDetail(id: any) {
    this.showLoader()
    this.dbService.getDataById('assignments', this.assignmentId).subscribe((assignmentData: any) => {
      this.assignmentData = assignmentData;
      this.hideLoader();
    });
  }
  get assignmentStatus(){
    return Common.assignmentStatus;
  }

  submit(){
    if (this.submitAssignmentForm.invalid) {
      return;
    }
    const assignment = {
      submitedData: this.submitAssignmentForm.value,
      assignmentStatus:this.assignmentStatus.COMPLETE
    }
    console.log('assignment',assignment)
    this.dbService.update('assignments',this.assignmentId,assignment)

  }

}
