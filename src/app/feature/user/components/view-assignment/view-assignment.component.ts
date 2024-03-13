import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.scss']
})
export class ViewAssignmentComponent {

constructor(private route: ActivatedRoute,public dialogRef: MatDialogRef<ViewAssignmentComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data',data)
  }

ngOnInit() {

}

closeDialog() {
  this.dialogRef.close();
}

}
