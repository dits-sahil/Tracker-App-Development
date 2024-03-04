import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
const routes: Routes = [

  { path: '', 
  component: ManagerComponent,
  children: [
    {
      path: 'assignmentList',
      component: AssignmentListComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
