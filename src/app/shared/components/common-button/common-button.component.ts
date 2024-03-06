import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.scss']
})
export class CommonButtonComponent {

  @Input() width: string = '';
  @Output() btnClickEvent = new EventEmitter<string>();
  @Input() disabled: boolean = false;
  onButtonClicked() {
    this.btnClickEvent.emit('Click');
  }

}
