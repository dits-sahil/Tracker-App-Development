import { Component, Input } from '@angular/core';

const data: any[] = [
  {index: 1, title: 'Hydrogen', description: 'Hydrogen listing', dueDate: '07/03/2024', priority: 1.0079, status: 'H', name: 'Hydrogen', email: 'hydrogen@gmail.com', phoneNo: 56453425223, noOfAssignments: 4},
  {index: 2, title: 'Helium', description: 'Helium listing', dueDate: '09/03/2024', priority: 4.0026, status: 'He', name: 'Hydrogen', email: 'helium@gmail.com', phoneNo: 56453425223, noOfAssignments: 4},
  {index: 3, title: 'Lithium', description: 'Lithium listing', dueDate: '10/03/2024', priority: 6.941, status: 'Li', name: 'Lithium', email: 'lithium@gmail.com', phoneNo: 56453425223, noOfAssignments: 4},
  {index: 4, title: 'Beryllium', description: 'Beryllium listing', dueDate: '15/03/2024', priority: 9.0122, status: 'Be', name: 'Beryllium', email: 'beryllium@gmail.com', phoneNo: 56453425223, noOfAssignments: 4},
];

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})


export class CommonTableComponent {
  @Input() columnHeadings: any;
  // @Input() dataSource: any;
  dataSource= data;

  editRow(){}

  deleteRow(i:any){
    console.log('delBtn',i)
    this.dataSource.splice(i, 1); 
  }

}
