import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent {
constructor(public dialogRef: MatDialogRef<any>,){}


closeDialog(data?: any) {
  this.dialogRef.close(data);
}
}
