import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.scss']
})
export class CommonButtonComponent {

  @Output() btnClickEvent = new EventEmitter<string>();

  onButtonClicked() {
    this.btnClickEvent.emit('Click');
  }

}
