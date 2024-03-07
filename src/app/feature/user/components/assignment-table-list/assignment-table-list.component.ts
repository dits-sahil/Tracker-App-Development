import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assignment-table-list',
  templateUrl: './assignment-table-list.component.html',
  styleUrls: ['./assignment-table-list.component.scss']
})
export class AssignmentTableListComponent {

  dataSource: any[] = [
    {index: 1, title: 'Hydrogen', description: 'Hydrogen listing', dueDate: '07/03/2024', priority: 1.0079, status: 'Pending'},
    {index: 2, title: 'Helium', description: 'Helium listing', dueDate: '09/03/2024', priority: 4.0026, status: 'Pending'},
    {index: 3, title: 'Lithium', description: 'Lithium listing', dueDate: '10/03/2024', priority: 6.941, status: 'Completed'},
    {index: 4, title: 'Beryllium', description: 'Beryllium listing', dueDate: '15/03/2024', priority: 9.0122, status: 'InProgress'}
  ];

  statusFilterForm!: FormGroup; 
  filter:any[] = [
    { id: 'All', name: 'All' },
    { id: 'InProgress', name: 'In Progress' },
    { id: 'Pending', name: 'Pending' },
    { id: 'Completed', name: 'Completed' }
  ];

  columnHeadings = ['index', 'title', 'description', 'dueDate', 'priority', 'status', 'actions'];
  filteredDataSource: any[] =[];

  ngOnInit() {
    this.statusFilterForm = new FormGroup({
      statusfilter: new FormControl<string>(''),
    });

    this.filteredDataSource = [...this.dataSource]
  }

  statusFilter(val: any) {
    if (val === 'All') {
      this.dataSource = this.filteredDataSource;
    } else {
      this.dataSource = this.filteredDataSource.filter((item: any) => item.status === val);
    }
  }
  
}
