import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewAssignmentComponent } from '../view-assignment/view-assignment.component';
import { ActionType } from 'src/app/core/constant/actionKeys';

@Component({
  selector: 'app-assignment-table-list',
  templateUrl: './assignment-table-list.component.html',
  styleUrls: ['./assignment-table-list.component.scss']
})
export class AssignmentTableListComponent {

  constructor(public dialog: MatDialog) { }

  dataSource: any[] = [
    { id: '1', index: 1, title: 'Hydrogen', description: 'Hydrogen listing', dueDate: '07/03/2024', priority: 'High', status: 'Pending' },
    { id: '2', index: 2, title: 'Helium', description: 'Helium listing', dueDate: '09/03/2024', priority: 'Medium', status: 'Pending' },
    { id: '3', index: 3, title: 'Lithium', description: 'Lithium listing', dueDate: '10/03/2024', priority: 'Medium', status: 'Completed' },
    { id: '4', index: 4, title: 'Beryllium', description: 'Beryllium listing', dueDate: '15/03/2024', priority: 'Low', status: 'In Progress' }
  ];

  filterForm!: FormGroup;
  statusFilterList: any[] = [
    { id: 'All', name: 'All' },
    { id: 'In Progress', name: 'In Progress' },
    { id: 'Pending', name: 'Pending' },
    { id: 'Completed', name: 'Completed' }
  ];
  priorityFilterList: any[] = [
    { id: 'All', name: 'All' },
    { id: 'High', name: 'High' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Low', name: 'Low' }
  ];

  columnHeadings = { 'index': 'Index', 'title': 'Title', 'description': 'Description', 'dueDate': 'Due Date', 'priority': 'Priority', 'status': 'Status', 'actions': 'Action' };

  filteredDataSource: any[] = [];
  data: any[] = [];

  ngOnInit() {
    this.filterForm = new FormGroup({
      statusFilter: new FormControl<string>(''),
      priorityFilter: new FormControl<string>(''),

    });

    this.filteredDataSource = [...this.dataSource]

    this.getAssignmentList()
  }

  get actionType() {
    return ActionType.key
  }
  private prepareActionType(actionData: { uid: any; }) {
    return [
      {
        ...actionData, actionType: this.actionType.DETAIL
      }
    ];
  }

  getAssignmentList() {
    let data = this.dataSource.map((item: any) => {
      let actionData = {
        uid: item.index
      }
      let actions = this.prepareActionType(actionData)
      item.actions = actions
    })
  }

  statusFilter(val: any) {
    if (val === 'All') {
      this.dataSource = this.filteredDataSource;
    } else {
      this.dataSource = this.filteredDataSource.filter((item: any) => item.status === val);
    }
  }

  priorityFilter(val: any) {
    if (val === 'All') {
      this.dataSource = this.filteredDataSource;
    } else {
      this.dataSource = this.filteredDataSource.filter((item: any) => item.priority === val);
    }
  }

  getAssignmentDetail(id: any) {
    this.data = this.dataSource.filter((item: any) => item.index == id);
    const dialogRef = this.dialog.open(ViewAssignmentComponent, {
      width: '50%',
      disableClose: true,
      data: {
        evetType: 'Detail',
        id: id,
        data: this.data[0]
      }
    });
  }

}
