import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/shared/components/dialogs/add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  columnHeadings = ['name', 'email', 'phoneNo', 'noOfAssignments', 'actions'];

  constructor(public dialog: MatDialog) {}

  openUserModal() {
    const dialogRef = this.dialog.open(AddUserComponent, {
        width: '40%',
        disableClose: true,
        data: {}
    });
  }

}
