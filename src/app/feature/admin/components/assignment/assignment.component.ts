import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent {
  assignmentList: any = [

  ]
  columnHeader: any =
    {
      'title': 'Title',
      'dueDate': 'Due Date',
      'priority': 'Priority',
      'createdBy': 'Created By',
      'assignedTo': 'Assigned To',
      'status': 'Status',
      'createdOn': 'Created On'
    };


  getAssignmentDetail(id: any) {

  }
}
