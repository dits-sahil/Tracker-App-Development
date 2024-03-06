import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { AAssignmentListComponent } from './components/a-assignment-list/a-assignment-list.component';
import { UiModule } from 'src/app/ui/ui.module';
import { ManageAssignmentComponent } from './components/manage-assignment/manage-assignment.component';
import { DatepickerModule } from 'ng2-datepicker';



@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    AAssignmentListComponent,
    ManagerListComponent,
    ManageAssignmentComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    UiModule,
    AdminRoutingModule,
    LayoutModule,
  
  ],
  exports:[

  ]
})
export class AdminModule { }
