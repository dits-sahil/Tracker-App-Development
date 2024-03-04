import { Component, Input } from '@angular/core';
const data: any[] = [
  {assignment: 1, assignTo: 'Hydrogen', assignBy: 1.0079, status: 'H'},
  {assignment: 2, assignTo: 'Helium', assignBy: 4.0026, status: 'He'},
  {assignment: 3, assignTo: 'Lithium', assignBy: 6.941, status: 'Li'},
  {assignment: 4, assignTo: 'Beryllium', assignBy: 9.0122, status: 'Be'},
];
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})


export class CommonTableComponent {
  @Input() userList :any

  displayedColumns: string[] = ['assignment', 'assignTo', 'assignBy', 'status'];
  dataSource = data;

}
