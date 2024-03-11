import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() firstLabel!: string;
  @Input() secondLabel!: string;
  @Input() firstControl!: string;
  @Input() secondControl!: string;
  @Input() form!: FormGroup;
  @Input() firstFilterList: any = [];
  @Input() secondFilterList: any = [];
  
  @Output() firstFilter: any = new EventEmitter();
  @Output() secondFilter: any = new EventEmitter();

  firstFilterChange(val: any) {
    this.firstFilter.emit(val);
  }

  secondFilterChange(val: any) {
    this.secondFilter.emit(val);
  }

}



