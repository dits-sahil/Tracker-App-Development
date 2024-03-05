import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent {

  columnHeadings = ['name', 'email', 'phoneNo', 'noOfAssignments', 'actions'];

}
