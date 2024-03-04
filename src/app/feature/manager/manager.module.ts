import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { SharedModule } from "../../shared/shared.module";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';

@NgModule({
    declarations: [
        ManagerComponent,
        AssignmentListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ManagerRoutingModule,
        LayoutModule
    ]
})
export class ManagerModule { }
