import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'm-manage-assignment',
  templateUrl: './m-manage-assignment.component.html',
  styleUrls: ['./m-manage-assignment.component.scss']
})
export class MManageAssignmentComponent {

  @Output() closeDialog = new EventEmitter;
  endBy:any
  isChanged: boolean = false;
  notChanged: boolean = false;
  showTimer: boolean = false;
  assginmentForm!: FormGroup;
  loading = false;
  EdituserData: any;
  responseData: any;
  date = new Date();
  prioritiesList: any[] = [
    { id: 1, name: 'High' },
    { id: 2, name: 'Low' },
    { id: 3, name: 'Medium' }
  ];
  StatusList: any[] = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'In-Progress' },
    { id: 3, name: 'Completed' }
  ];
  constructor(private validationService: ValidationService, private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,) { }
  ngOnInit() {
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
      createdOn: new FormControl<any>('', [
        Validators.required
      ]),
      priority: new FormControl<any>('', [
        Validators.required
      ]),
      endBy:new FormControl<any>('', [
        Validators.required
      ]),
      assignedTo: new FormControl<any>('', [
        Validators.required
      ]),
    });
  }
  addAssignment(EdituserData: any) {
    console.log('endBy',this.endBy);
    return
    let data: any = this.assginmentForm.value;
    data['createdBy'] ='manager'
    data['assignedBy'] =''

    if (this.assginmentForm.invalid) {
      return;
    }
    this.loading = true;
    this.dataService.create('assignment', data).then((res: any) => {
      this.responseData = res
      let uid = this.responseData.assginment.uid
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
