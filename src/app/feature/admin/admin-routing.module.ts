import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [

  {
    path: '', component: AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'users',
        component:UserListComponent
      },
      {
        path:'assignments',
        component:AssignmentComponent,
      },
      {
        path:'assignments/:id',
        component:AssignmentComponent,
      },
      {
        path:'userDetails/:id',
        component:UserDetailsComponent,
      },
      {
        path:'userList/:id',
        component:UserListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
