import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.scss']
})
export class ViewAssignmentComponent {
// data: any;

constructor(private route: ActivatedRoute,public dialogRef: MatDialogRef<ViewAssignmentComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data',data)
  }

ngOnInit() {
    // this.data = history.state.data;
    // const data = this.route.snapshot.params['index']
    // console.log('data',this.data)

}

closeDialog() {
  this.dialogRef.close();
}

}
