import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-invite',
  templateUrl: './confirm-invite.component.html',
  styleUrls: ['./confirm-invite.component.scss','../confirm-box/confirm-box.component.scss']
})
export class ConfirmInviteComponent {
  constructor(public dialogRef: MatDialogRef<any>,){}


  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }
}
