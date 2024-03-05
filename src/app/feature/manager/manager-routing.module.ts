import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [

  { path: '', 
  component: ManagerComponent,
  children: [
    {
      path: 'manager/user',
      component: UsersComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
