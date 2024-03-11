import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assignment-table-list',
  templateUrl: './assignment-table-list.component.html',
  styleUrls: ['./assignment-table-list.component.scss']
})
export class AssignmentTableListComponent {

  dataSource: any[] = [
    {Index: 1, Title: 'Hydrogen', Description: 'Hydrogen listing', DueDate: '07/03/2024', Priority: 'High', Status: 'Pending'},
    {Index: 2, Title: 'Helium', Description: 'Helium listing', DueDate: '09/03/2024', Priority: 'Medium', Status: 'Pending'},
    {Index: 3, Title: 'Lithium', Description: 'Lithium listing', DueDate: '10/03/2024', Priority: 'Medium', Status: 'Completed'},
    {Index: 4, Title: 'Beryllium', Description: 'Beryllium listing', DueDate: '15/03/2024', Priority: 'Low', Status: 'InProgress'}
  ];

  filterForm!: FormGroup; 
  statusFilterList:any[] = [
    { id: 'All', name: 'All' },
    { id: 'InProgress', name: 'In Progress' },
    { id: 'Pending', name: 'Pending' },
    { id: 'Completed', name: 'Completed' }
  ];
  priorityFilterList:any[] = [
    { id: 'All', name: 'All' },
    { id: 'High', name: 'High' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Low', name: 'Low' }
  ];

  columnHeadings = ['Index', 'Title', 'Description', 'DueDate', 'Priority', 'Status', 'Actions'];
  filteredDataSource: any[] =[];

  ngOnInit() {
    this.filterForm = new FormGroup({
      statusFilter: new FormControl<string>(''),
      priorityFilter: new FormControl<string>(''),

    });

    this.filteredDataSource = [...this.dataSource]
  }

  statusFilter(val: any) {
    if (val === 'All') {
      this.dataSource = this.filteredDataSource;
    } else {
      this.dataSource = this.filteredDataSource.filter((item: any) => item.Status === val);
    }
  }

  priorityFilter(val: any) {
    if (val === 'All') {
      this.dataSource = this.filteredDataSource;
    } else {
      this.dataSource = this.filteredDataSource.filter((item: any) => item.Priority === val);
    }
  }
  
}
