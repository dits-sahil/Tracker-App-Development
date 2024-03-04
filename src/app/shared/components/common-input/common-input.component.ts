import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-input',
  templateUrl: './common-input.component.html',
  styleUrls: ['./common-input.component.scss']
})
export class CommonInputComponent {

  @Input() label!: string;
  @Input() icon!: string;
  @Input() type!: string;
  @Input() control!: any;
  @Input() name!: any;
  @Input() placeholder!: string;
  @Input() form!: FormGroup;
  @Input() error:any;
  @Input() submitted:any;
  @Input() fValue:any;
  @Input() errorClass:any;
  @Input () class:any ;
  @Input () maxlength:any;
  @Input () readonly:any
  @Input () isbeforeicon:any
  @Input () beforeIcon!:String

}
