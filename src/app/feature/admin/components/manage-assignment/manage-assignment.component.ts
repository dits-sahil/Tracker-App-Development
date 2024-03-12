import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { CONSTANTS } from 'src/app/core/utils/app.-constants';

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
  date = new Date();
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


}
