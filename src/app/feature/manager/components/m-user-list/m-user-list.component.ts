import { Component } from '@angular/core';

@Component({
  selector: 'app-m-user-list',
  templateUrl: './m-user-list.component.html',
  styleUrls: ['./m-user-list.component.scss']
})
export class MUserListComponent {

  columnHeadings = ['name', 'email', 'phoneNo', 'noOfAssignments', 'actions'];

}
