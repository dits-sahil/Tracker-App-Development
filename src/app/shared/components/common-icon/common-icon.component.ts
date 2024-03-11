import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-icon',
  templateUrl: './common-icon.component.html',
  styleUrls: ['./common-icon.component.scss']
})
export class CommonIconComponent {
@Input() color:any
@Input() name:any
@Output() action = new EventEmitter<any>();


onActionClick(){
  this.action.emit()
}

}


