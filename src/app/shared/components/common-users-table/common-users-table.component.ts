import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActionType as Actions } from 'src/app/core/constant/actionKeys';
@Component({
  selector: 'app-common-users-table',
  templateUrl: './common-users-table.component.html',
  styleUrls: ['./common-users-table.component.scss']
})
export class CommonUsersTableComponent {
  objectKeys = Object.keys;
  dataSource: any;
  @Input() tableData: any;
  @Input() columnHeader: any;
  @Input() label: any;
  @Input() color: any;
  @Output() viewDetail: any = new EventEmitter();
  @Output() updateDetail: any = new EventEmitter();
  @Output() deleteUser: any = new EventEmitter();

  public get actionType(): any {
    return Actions
  }
  ngOnInIt(){}

  cancelApp(item: any) {

  }
  showDetails(val: any) {
    this.viewDetail.emit(val)
  }

  updateUserDetail(val: any) {
    this.updateDetail.emit(val)

  }
  userDelete(val: any) {
    this.deleteUser.emit(val)

  }
}
