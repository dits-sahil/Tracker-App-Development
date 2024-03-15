import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { AssignmentComponent } from '../admin/components/assignment/assignment.component';
import { UserAssignmentDetailsComponent } from './components/user-assignment-details/user-assignment-details.component';

const routes: Routes = [

  {
    path: '', component: UserComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'assignments', 
        component: AssignmentComponent,
      },
      {
        path:'assignments/:id',
        component:AssignmentComponent,
      },
      {
        path:'assignmentDetails/:id',
        component:UserAssignmentDetailsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
