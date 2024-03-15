import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-change-assignment-status',
  templateUrl: './change-assignment-status.component.html',
  styleUrls: ['./change-assignment-status.component.scss']
})
export class ChangeAssignmentStatusComponent {

  constructor(public dialogRef: MatDialogRef<any>,
    private validationService: ValidationService) { }

    assignmentStatusForm!: FormGroup;

    statusList: any[] = [
      { id: 'In Progress', name: 'In Progress' },
      { id: 'Completed', name: 'Completed' }
  ];

  ngOnInit() {
    this.assignmentStatusForm = new FormGroup({
      status: new FormControl<string>('', [
        Validators.required
      ]),
    });
    }


    getErrorValidator(value: any, label: string) {
      return this.validationService.getErrorValidationMessages(value, this.assignmentStatusForm, label);
    }

    getstatus(val: any) {
      this.assignmentStatusForm.get('status')?.setValue(val);
    }

    status(){
      if (this.assignmentStatusForm.invalid) {
        this.assignmentStatusForm.markAllAsTouched();
        return;
      }
      this.closeDialog();
    }

    closeDialog() {
      this.dialogRef.close();
    }

}
