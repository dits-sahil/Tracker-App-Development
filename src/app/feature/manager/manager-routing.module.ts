import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { UserListComponent } from '../admin/components/user-list/user-list.component';
import { AssignmentComponent } from '../admin/components/assignment/assignment.component';
import { UserDetailsComponent } from '../admin/components/user-details/user-details.component';
import { AssignmnetDetailsComponent } from '../admin/components/assignmnet-details/assignmnet-details.component';
import { ProfileComponent } from 'src/app/core/authentication/components/profile/profile.component';

const routes: Routes = [

  { path: '',
  component: ManagerComponent,
  children: [
    {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path: 'users',
      component:UserListComponent
    },
    {
      path: 'assignments',
      component:AssignmentComponent
    },
    {
      path:'userDetails/:id',
      component:UserDetailsComponent,
    },
    {
      path:'user-assignments/:id',
      component:AssignmentComponent,
    },
    {
      path:'assignmentDetails/:id',
      component:AssignmnetDetailsComponent,
    },
    {
      path: 'profile', 
      component: ProfileComponent,
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
