import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AssignmentTableListComponent } from './components/assignment-table-list/assignment-table-list.component';

const routes: Routes = [

  { path: '', component: UserComponent,
children:[
  {
    path: 'assignments', component: AssignmentTableListComponent,
  }
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
