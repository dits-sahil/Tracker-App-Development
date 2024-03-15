import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Common } from 'src/app/core/constant/commonKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent {

  constructor(public dialogRef: MatDialogRef<any>,
    private validationService: ValidationService,
    private dbService: FirebaseService, private authService: AuthService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  addAssignmentForm!: FormGroup;

  priorityList: any[] = [
    { id: this.priority.LOW, name: 'Low' },
    { id: this.priority.MEDIUM, name: 'Medium' },
    { id: this.priority.HIGH, name: 'High' }
  ];
  userList: any[] = []
  minDate: Date = new Date();

  ngOnInit() {
    this.initializeForm();
    this.getUserList();
  }
  get priority(){
    return Common.priority;
  }
  get inviteStatus(){
    return Common.inviteStatus;
  }
  get assignmentStatus(){
    return Common.assignmentStatus;
  }


  initializeForm() {
    this.addAssignmentForm = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      dueDate: new FormControl<string>('', [
        Validators.required,
      ]),
      priority: new FormControl<string>('', [
        Validators.required,
      ]),
      assignedTo: new FormControl<string>('', [

      ]),
      description: new FormControl<string>('', [
        Validators.required,
      ]),
    });
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.addAssignmentForm, label);
  }

  getPriority(val: any) {
    this.addAssignmentForm.get('priority')?.setValue(val);
  }

  getassigned(val: any) {
    this.addAssignmentForm.get('assignedTo')?.setValue(val);
  }
  get loggedInUserId() {
    return this.authService.loggedInUserId()
  }

  getUserList() {
    this.dbService.getAll('users', 'parent', this.loggedInUserId, 'equalTo').subscribe(
      {
        next: (res: any) => {
          if (res) {
            let userList: any = []
            res.map((items: any) => userList = [...userList, { id: items.uid, name: items.name }])
            this.userList = userList
          }
        },
        error: (err: any) => console.log(err),
        complete: () => console.log('complete'),
      }
    )
  }

  assignmentAction() {
    if (this.addAssignmentForm.invalid) {
      this.addAssignmentForm.markAllAsTouched();
      return;
    }
    let formData: any = this.addAssignmentForm.value;

    if(this.data.evetType != 'update') {
      this.createAssignment(formData);
    }

  }



  createAssignment(formData:any){
    let data = formData
    data.dueDate = this.sharedService.convertDateToTimeStamp(data.dueDate)
    data = {...data, createdBy:this.loggedInUserId,inviteStatus:this.inviteStatus.PENDING,assignmentStatus:this.assignmentStatus.PENDING,startedOn:'',endedOn:''}
    this.dbService.create('assignments',data).then((res:any)=>{
      if (res) {
        this.toastrService.success('Asssignment created succcessfully')
      }
      }).catch((error:any) => this.toastrService.error(error))
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
