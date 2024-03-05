import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { SharedModule } from "../../shared/shared.module";
import { ManagerRoutingModule } from './manager-routing.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { ManagerUserComponent } from './manager-user/manager-user.component';

@NgModule({
    declarations: [
        ManagerComponent,
        ManagerUserComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ManagerRoutingModule,
        LayoutModule
    ]
})
export class ManagerModule { }
