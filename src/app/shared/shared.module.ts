import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { CommonInputComponent } from './components/common-input/common-input.component';
import { CommonSelectComponent } from './components/common-select/common-select.component';
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
import { AddAssignmentComponent } from './components/dialogs/add-assignment/add-assignment.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonTextareaComponent } from './components/common-textarea/common-textarea.component';
import { ChangeAssignmentStatusComponent } from './components/dialogs/change-assignment-status/change-assignment-status.component';
import { CommonDatePickerComponent } from './components/common-datepicker/common-date-picker.component';
import { ConfirmInviteComponent } from './components/dialogs/confirm-invite/confirm-invite.component';

@NgModule({
  declarations: [
    CommonInputComponent,
    CommonSelectComponent,
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
    AddAssignmentComponent,
    CommonTextareaComponent,
    ChangeAssignmentStatusComponent,
    CommonDatePickerComponent,
    ConfirmInviteComponent,
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
    CommonButtonComponent,
    BaseLayoutComponent,
    DashboardComponent,
    AddUserComponent,
    AssignmentStatusComponent,
    CommonUsersTableComponent,
    FilterComponent,
    ConfirmBoxComponent,
    DetailComponent,
    NgxSpinnerModule,
    ChangeAssignmentStatusComponent,
    AddAssignmentComponent,
    CommonDatePickerComponent,
    CommonTextareaComponent
  ],
})
export class SharedModule { }
