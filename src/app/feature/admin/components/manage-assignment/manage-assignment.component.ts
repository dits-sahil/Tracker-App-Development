import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';

@Component({
  selector: 'popup-manage-assignment',
  templateUrl: './manage-assignment.component.html',
  styleUrls: ['./manage-assignment.component.scss']
})
export class ManageAssignmentComponent {
  @Output() closeDialog = new EventEmitter;
  isChanged: boolean = false;
  notChanged: boolean = false;
  showTimer: boolean = false;
  assginmentForm!: FormGroup;
  loading = false;
  EdituserData: any;
  responseData: any;

  constructor(private validationService: ValidationService, private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,){}
  ngOnInit() {
    this.assginmentForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      desc: new FormControl<string>('', [
        Validators.required,
      ]),
      status: new FormControl<string>('', [
        Validators.required
      ]),
      // date: new FormControl<any>('', [
      //   Validators.required
      // ]),
    });
  }
  AddUser(EdituserData: any) {
    if (this.assginmentForm.invalid) {
      return;
    }
    this.loading = true;
    let data :any = this.assginmentForm.value;
    this.dataService.create('assignment', data).then((res:any)=>{
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
  
  options: DatepickerOptions = {
    minYear: getYear(new Date()) - 80, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    maxDate: new Date(),
    placeholder: 'Date of birth', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color,
  };

}
