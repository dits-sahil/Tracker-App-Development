import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionType } from 'src/app/core/constant/actionKeys';
import { AssignmentListComponent } from 'src/app/shared/components/dialogs/assignment-list/assignment-list.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent {
  assignmentList: any[] = [
    { id: '1', index: 1, title: 'Hydrogen', description: 'Hydrogen listing', dueDate: '07/03/2024', priority: 'High', status: 'Pending' },
    { id: '2', index: 2, title: 'Helium', description: 'Helium listing', dueDate: '09/03/2024', priority: 'Medium', status: 'Pending' },
    { id: '3', index: 3, title: 'Lithium', description: 'Lithium listing', dueDate: '10/03/2024', priority: 'Medium', status: 'Completed' },
    { id: '4', index: 4, title: 'Beryllium', description: 'Beryllium listing', dueDate: '15/03/2024', priority: 'Low', status: 'In Progress' }
  ];
  columnHeader = { 'index': 'Index', 'title': 'Title', 'description': 'Description', 'dueDate': 'Due Date', 'priority': 'Priority', 'status': 'Status', 'actions': 'Action' };

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.getAssignmentList()
  }

  get actionType() {
    return ActionType.key
  }

  prepareActionType(actionData: { uid: any; }) {
    return [
      {
        ...actionData, actionType: this.actionType.DELETE
      },
      {
        ...actionData, actionType: this.actionType.UPDATE
      },
      {
        ...actionData, actionType: this.actionType.DETAIL
      }
    ];
  }
  getAssignmentList() {
    let data = this.assignmentList.map((item: any) => {
      let actionData = {
        uid: item.index
      }
      let actions = this.prepareActionType(actionData)
      item.actions = actions
    })
  }

  getAssignmentDetail(id:any){

}

updateAssignmentDetail(id:any){

}

openDeleteAssignmentModal(id:any){}

createAssignment(evetType: string) {
  const dialogRef = this.dialog.open(AssignmentListComponent, {
    width: '40%',
    data: {
      evetType,
    }
  });
}

}
