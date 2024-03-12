import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CONSTANTS } from 'src/app/core/utils/app.-constants';
import { StorageService } from 'src/app/core/services/storage.service';
import { StorageKeys } from 'src/app/core/constant/storageKeys';
import { Observable } from 'rxjs';

@Component({
  selector: 'm-manage-assignment',
  templateUrl: './m-manage-assignment.component.html',
  styleUrls: ['./m-manage-assignment.component.scss']
})
export class MManageAssignmentComponent {

  @Output() closeDialog = new EventEmitter;
  endBy: any
  isChanged: boolean = false;
  notChanged: boolean = false;
  showTimer: boolean = false;
  assginmentForm!: FormGroup;
  loading = false;
  EdituserData: any;
  responseData: any;
  userList: any[] = [];
  date = new Date();
  users: any[] = [];

  prioritiesList: any[] = [
    { id: 1, name: CONSTANTS.high },
    { id: 2, name: CONSTANTS.low },
    { id: 3, name: CONSTANTS.medium }
  ];
  StatusList: any[] = [
    { id: 1, name: CONSTANTS.pending },
    { id: 2, name: CONSTANTS.inprogress },
    { id: 3, name: CONSTANTS.complete }
  ];
  uid: any;
  constructor(private validationService: ValidationService, private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService, private readonly storage_service: StorageService) {
    let profile: any = storage_service.getStorage(StorageKeys.keys.USERDETAIL);
    profile = JSON.parse(profile)
    this.uid = profile.uid

  }
  ngOnInit() {
    debugger
    this.getUserData(this.uid);
    this.assginmentForm = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      desc: new FormControl<string>('', [
        Validators.required,
      ]),
      status: new FormControl<string>('', [
        Validators.required
      ]),
      // createdOn: new FormControl<any>('', [
      //   Validators.required
      // ]),
      priority: new FormControl<any>('', [
        Validators.required
      ]),
      endBy: new FormControl<any>('', [
        Validators.required
      ]),
      assignedTo: new FormControl<any>('', [
        Validators.required
      ]),
    });
  }
  async getUserData(id: any) {
    debugger
    // await this.updateDeviceToken(userId)
    this.firebaseService.getAll('users').subscribe((data: any[]) => {
      this.users = data;
    });
  }

  addAssignment() {
    debugger
    const current = new Date();
    const timestamp = current.getTime();
    let data: any = this.assginmentForm.value;
    data['endBy'] = (this.assginmentForm.value.endBy).getTime();
    data['createdOn'] = timestamp
    data['createdBy'] = 'manager'
    data['assignedBy'] = ''

    if (this.assginmentForm.invalid) {
      return;
    }
    this.loading = true;
    this.firebaseService.create('assignment', data).then((res: any) => {
      this.responseData = res

    })
  }
  onClose() {
    if (this.isChanged) {
      this.closeDialog.emit(this.isChanged);
    }
    this.closeDialog.emit(false || this.notChanged);
  }
  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.assginmentForm, label);
  }
  getPriority(val: any) {
    // this.registrationForm.get('role')?.setValue(val);
  }
  dateConvert() {


  }

}
