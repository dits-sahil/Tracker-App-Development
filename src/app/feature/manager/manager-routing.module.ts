import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { MUserListComponent } from './components/m-user-list/m-user-list.component';
import { MAssignmentListComponent } from './components/m-assignment-list/m-assignment-list.component';

const routes: Routes = [

  { path: '', 
  component: ManagerComponent,
  children: [
    {
      path: 'users',
      component:MUserListComponent
    },
    {
      path: 'assignments',
      component:MAssignmentListComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
