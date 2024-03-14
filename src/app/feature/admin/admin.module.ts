import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UiModule } from 'src/app/ui/ui.module';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AssignmnetDetailsComponent } from './components/assignmnet-details/assignmnet-details.component';



@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    AssignmentComponent,
    UserDetailsComponent,
    AssignmnetDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UiModule,
    AdminRoutingModule,
    LayoutModule,

  ],
  exports:[
    UserDetailsComponent
  ]
})
export class AdminModule { }
