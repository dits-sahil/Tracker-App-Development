import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AAssignmentListComponent } from './components/a-assignment-list/a-assignment-list.component';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManageAssignmentComponent } from './components/manage-assignment/manage-assignment.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '', component: AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'assignments',
        component:AAssignmentListComponent
      },
      {
        path:'managers',
        component: ManagerListComponent
      },
      {
        path:'users',
        component:UserListComponent
      },
      {
        path:'manage-assignment',
        component:ManageAssignmentComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
