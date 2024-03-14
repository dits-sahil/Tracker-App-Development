import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent {

  constructor(public dialogRef: MatDialogRef<any>,
    private validationService: ValidationService,
    private dbService: FirebaseService, private authService: AuthService) { }

  addAssignmentForm!: FormGroup;

  priorityList: any[] = [
    { id: 'High', name: 'High' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Low', name: 'Low' }
  ];
  userList: any[] = []

  ngOnInit() {
    this.initializeForm();
    this.getUserList();
  }

  initializeForm() {
    this.addAssignmentForm = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      dueDate: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      priority: new FormControl<string>('', [
        Validators.required,
      ]),
      assignedTo: new FormControl<string>('', [
        Validators.required,
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
    get getLoggedInUserId() {
      return this.authService.loggedInUserId()
    }
    getUserList() {
      this.dbService.getAll('users', 'parent', this.getLoggedInUserId, 'equalTo').subscribe(
        {
          next: (res: any) => {
            if (res) {
              let userList: any = []
              res.map((items: any) => userList = [...userList, { id: items.uid, name: items.name }])
              this.userList = userList
              console.log('userList:', userList)
            }
          },
          error: (err: any) => console.log(err),
          complete: () => console.log('complete'),
        }
      )
    }

  assignmentAction(){

  }
  closeDialog() {
    this.dialogRef.close();
  }

}
