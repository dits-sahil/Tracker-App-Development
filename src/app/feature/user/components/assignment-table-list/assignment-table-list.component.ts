import { Component } from '@angular/core';



@Component({
  selector: 'app-assignment-table-list',
  templateUrl: './assignment-table-list.component.html',
  styleUrls: ['./assignment-table-list.component.scss']
})
export class AssignmentTableListComponent {

  columnHeadings = ['index', 'title', 'description', 'dueDate', 'priority', 'status', 'actions'];
 


}
