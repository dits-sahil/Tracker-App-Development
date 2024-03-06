import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-checkbox',
  templateUrl: './common-checkbox.component.html',
  styleUrls: ['./common-checkbox.component.scss']
})
export class CommonCheckboxComponent {

  @Input() label: string | undefined;
  @Input() control!: any;
  @Input() error: any;
  @Input() form!: FormGroup;
  @Input() List: any;
  @Input() placeholder: any
  @Input() payload: any
  @Output() selectedId: any = new EventEmitter();

  getDropDownValue(id: any) {

    if (this.payload) {
      this.payload.id = id;
      this.selectedId.emit(this.payload)
    }else{
      this.selectedId.emit(id)
    }

  }
  
}
