import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,

    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    LayoutModule
  ],
  exports:[
    // UsersComponent,
  ]
})
export class AdminModule { }
