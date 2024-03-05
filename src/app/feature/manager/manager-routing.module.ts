import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ManagerUserComponent } from './manager-user/manager-user.component';

const routes: Routes = [

  { path: '', 
  component: ManagerComponent,
  children: [
    {
      path: 'users',
      component:ManagerUserComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
