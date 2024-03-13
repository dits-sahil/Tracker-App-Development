import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { StorageKeys } from 'src/app/core/constant/storageKeys';
import { StorageService } from 'src/app/core/services/storage.service';
import { ViewAssignmentComponent } from 'src/app/feature/user/components/view-assignment/view-assignment.component';

const data: any[] = [
  { index: 1, title: 'Hydrogen', description: 'Hydrogen listing', dueDate: '07/03/2024', priority: 1.0079, status: 'Pending', name: 'Hydrogen', email: 'hydrogen@gmail.com', phoneNo: 56453425223, noOfAssignments: 4 },
  { index: 2, title: 'Helium', description: 'Helium listing', dueDate: '09/03/2024', priority: 4.0026, status: 'Pending', name: 'Hydrogen', email: 'helium@gmail.com', phoneNo: 56453425223, noOfAssignments: 4 },
  { index: 3, title: 'Lithium', description: 'Lithium listing', dueDate: '10/03/2024', priority: 6.941, status: 'Completed', name: 'Lithium', email: 'lithium@gmail.com', phoneNo: 56453425223, noOfAssignments: 4 },
  { index: 4, title: 'Beryllium', description: 'Beryllium listing', dueDate: '15/03/2024', priority: 9.0122, status: 'InProgress', name: 'Beryllium', email: 'beryllium@gmail.com', phoneNo: 56453425223, noOfAssignments: 4 },
];

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})


export class CommonTableComponent {

  constructor(private router: Router, private storageService: StorageService,public dialog: MatDialog) {
    let profile: any = storageService.getStorage(StorageKeys.keys.USERDETAIL);
profile = JSON.parse(profile)
    this.role = profile.role
  }

  public get userRoleConfig(): any {
    return userRoleConfig
  }
  @ViewChild(MatSort) sort!: MatSort;
  @Input() columnHeadings: any;
  @Input() dataSource: any;
  @Input() label: any;
  // dataSource= data;
  role: any;
  user: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onViewClick(element: any) {
    // this.router.navigate(['user', 'viewAssignment', element.index], { state: { data: element } });

      const dialogRef = this.dialog.open(ViewAssignmentComponent, {
          width: '50%',
          disableClose: true,
          data: {
            element
          }
      });
    }

}

