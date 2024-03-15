import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AssignmentTableListComponent } from './components/assignment-table-list/assignment-table-list.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { ViewAssignmentComponent } from './components/view-assignment/view-assignment.component';
import { AssignmentComponent } from '../admin/components/assignment/assignment.component';

const routes: Routes = [

  {
    path: '', component: UserComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'assignments', component: AssignmentComponent,
      },
      {
        path:'assignments/:id',
        component:AssignmentComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
