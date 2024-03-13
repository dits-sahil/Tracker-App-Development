import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent {

  constructor(public dialogRef: MatDialogRef<any>) { }

  addAssignmentForm!: FormGroup;

  assignmentAction(){

  }
  closeDialog() {
    this.dialogRef.close();
  }

}
