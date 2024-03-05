import { Component } from '@angular/core';

@Component({
  selector: 'app-a-assignment-list',
  templateUrl: './a-assignment-list.component.html',
  styleUrls: ['./a-assignment-list.component.scss']
})
export class AAssignmentListComponent {

  columnHeadings = ['index', 'title', 'description', 'dueDate', 'priority', 'status', 'actions'];

}
