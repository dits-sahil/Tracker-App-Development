import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AssignmentTableListComponent } from './components/assignment-table-list/assignment-table-list.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { ViewAssignmentComponent } from './components/view-assignment/view-assignment.component';

const routes: Routes = [

  {
    path: '', component: UserComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'assignments', component: AssignmentTableListComponent,
      },
      {
        path: 'viewAssignment/:index', component: ViewAssignmentComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
