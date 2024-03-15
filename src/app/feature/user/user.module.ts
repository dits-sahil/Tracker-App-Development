import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { AssignmentTableListComponent } from './components/assignment-table-list/assignment-table-list.component';
import { UiModule } from 'src/app/ui/ui.module';
import { ViewAssignmentComponent } from './components/view-assignment/view-assignment.component';
import { UserAssignmentDetailsComponent } from './components/user-assignment-details/user-assignment-details.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';


@NgModule({
  declarations: [
    UserComponent,
    AssignmentTableListComponent,
    ViewAssignmentComponent,
    UserAssignmentDetailsComponent,
    SubmitAssignmentComponent
  ],
  imports: [
    CommonModule,
        SharedModule,
        UserRoutingModule,
        LayoutModule,
        UiModule
  ],
  exports:[
    UserComponent,
    AssignmentTableListComponent
  ]
  
})
export class UserModule { }
