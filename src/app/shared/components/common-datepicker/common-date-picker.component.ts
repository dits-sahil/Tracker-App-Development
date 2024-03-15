import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-date-picker',
  templateUrl: './common-date-picker.component.html',
  styleUrls: ['./common-date-picker.component.scss']
})
export class CommonDatePickerComponent {
  @Input() control!: any;
  @Input() error: any;
  @Input() form: any;
  @Input() label: any
  @Input() maxDate:any;
  @Input() minDate:any;
  @Input() appearance:any;
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };
}
