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
import { AssignmentStatusComponent } from './components/assignment-status/assignment-status.component';
import { CommonUsersTableComponent } from './components/common-users-table/common-users-table.component';
import { CommonIconComponent } from './components/common-icon/common-icon.component';
import { FilterComponent } from './components/filter/filter.component';
import { ConfirmBoxComponent } from './components/dialogs/confirm-box/confirm-box.component';
import { DetailComponent } from './components/detail/detail.component';
import { AssignmentListComponent } from './components/dialogs/assignment-list/assignment-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    AssignmentStatusComponent,
    CommonUsersTableComponent,
    CommonIconComponent,
    FilterComponent,
    ConfirmBoxComponent,
    DetailComponent,
    AssignmentListComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    LayoutRoutingModule,
    LayoutModule,
    AngularFireStorageModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonInputComponent,
    CommonSelectComponent,
    CommonTableComponent,
    CommonButtonComponent,
    BaseLayoutComponent,
    DashboardComponent,
    AddUserComponent,
    AssignmentStatusComponent,
    CommonUsersTableComponent,
    FilterComponent,
    ConfirmBoxComponent,
    DetailComponent,
    NgxSpinnerModule
  ],
})
export class SharedModule { }
