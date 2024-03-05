import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AssignmentComponent } from './component/assignment/assignment.component';

const routes: Routes = [

  { path: '', component: UserComponent,
children:[
  {
    path: 'assignments', component: AssignmentComponent,
  }
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
