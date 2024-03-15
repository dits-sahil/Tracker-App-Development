import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { AssignmentComponent } from '../admin/components/assignment/assignment.component';
import { UserAssignmentDetailsComponent } from './components/user-assignment-details/user-assignment-details.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';
import { ProfileComponent } from 'src/app/core/authentication/components/profile/profile.component';

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
        path:'assignmentDetails/:id',
        component:UserAssignmentDetailsComponent
      },
      {
        path:'submitAssignment/:id',
        component:SubmitAssignmentComponent
      },
      {
        path: 'invites', 
        component: AssignmentComponent,
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
export class UserRoutingModule { }
