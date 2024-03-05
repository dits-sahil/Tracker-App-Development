import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { SharedModule } from "../../shared/shared.module";
import { ManagerRoutingModule } from './manager-routing.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { MAssignmentListComponent } from './components/m-assignment-list/m-assignment-list.component';
import { MUserListComponent } from './components/m-user-list/m-user-list.component';

@NgModule({
    declarations: [
        ManagerComponent,
        MAssignmentListComponent,
        MUserListComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ManagerRoutingModule,
        LayoutModule
    ]
})
export class ManagerModule { }
