import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { CommonInputComponent } from './components/common-input/common-input.component';
import { CommonSelectComponent } from './components/common-select/common-select.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddUserComponent } from './components/dialogs/add-user/add-user.component';
import { CommonCheckboxComponent } from './components/common-checkbox/common-checkbox.component';
import { CommonButtonComponent } from './components/common-button/common-button.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { LayoutRoutingModule } from './components/layout/layout-routing.module';
import { LayoutModule } from './components/layout/layout.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CommonUsersTableComponent } from './components/common-users-table/common-users-table.component';
import { CommonIconComponent } from './components/common-icon/common-icon.component';

@NgModule({
  declarations: [
    CommonInputComponent,
    CommonSelectComponent,
    CommonTableComponent,
    PageNotFoundComponent,
    AddUserComponent,
    CommonButtonComponent,
    CommonCheckboxComponent,
    BaseLayoutComponent,
    DashboardComponent,
    CommonUsersTableComponent,
    CommonIconComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    LayoutRoutingModule,
    LayoutModule,
    AngularFireStorageModule

  ],
  exports:[
    CommonInputComponent,
    CommonSelectComponent,
    CommonTableComponent,
    CommonButtonComponent,
    BaseLayoutComponent,
    DashboardComponent,
    AddUserComponent,
    CommonUsersTableComponent

  ],
})
export class SharedModule { }
