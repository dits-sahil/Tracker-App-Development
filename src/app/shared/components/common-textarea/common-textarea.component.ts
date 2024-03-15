import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-textarea',
  templateUrl: './common-textarea.component.html',
  styleUrls: ['./common-textarea.component.scss']
})
export class CommonTextareaComponent {

  @Input() form!: FormGroup;
  @Input() control!: any;
  @Input() label!: string;
  @Input() error:any;
  @Input() class:any;
  @Input() type:any;
  @Input() placeholder:any;
}
