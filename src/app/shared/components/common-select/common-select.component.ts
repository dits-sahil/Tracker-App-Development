import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-select',
  templateUrl: './common-select.component.html',
  styleUrls: ['./common-select.component.scss'],
})
export class CommonSelectComponent {
  @Input() label: string | undefined;
  @Input() control!: any;
  @Input() error: any;
  @Input() form!: FormGroup;
  @Input() List: any;
  @Input() placeholder: any
  @Input() payload: any
  @Output() selectedId: any = new EventEmitter();
  constructor() { }

  getDropDownValue(id: string) {

    if (this.payload) {
      this.payload.id = id;
      this.selectedId.emit(this.payload)
    }else{
      this.selectedId.emit(id)
    }

  }
}
