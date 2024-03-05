import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { AssignmentComponent } from './component/assignment/assignment.component';


@NgModule({
  declarations: [
    UserComponent,
    AssignmentComponent
  ],
  imports: [
    CommonModule,
        SharedModule,
        UserRoutingModule,
        LayoutModule
  ]
})
export class UserModule { }
