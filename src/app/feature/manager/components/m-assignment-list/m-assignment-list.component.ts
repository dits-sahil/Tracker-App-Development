import { Component } from '@angular/core';

@Component({
  selector: 'app-m-assignment-list',
  templateUrl: './m-assignment-list.component.html',
  styleUrls: ['./m-assignment-list.component.scss']
})
export class MAssignmentListComponent {

  columnHeadings = ['index', 'title', 'description', 'dueDate', 'priority', 'status', 'actions'];

}
