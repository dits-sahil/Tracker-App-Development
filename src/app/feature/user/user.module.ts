import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { AssignmentTableListComponent } from './components/assignment-table-list/assignment-table-list.component';
import { UiModule } from 'src/app/ui/ui.module';


@NgModule({
  declarations: [
    UserComponent,
    AssignmentTableListComponent
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
