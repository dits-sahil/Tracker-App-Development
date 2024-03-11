import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-status',
  templateUrl: './assignment-status.component.html',
  styleUrls: ['./assignment-status.component.scss']
})
export class AssignmentStatusComponent {

  // @Input() status: any;
  @Input() element: any;
  
    getStatusClass(status: string) {
      switch (status) {
        case 'pending':
          return 'pending';
        case 'in progress':
          return 'inProgress';
        case 'complete':
          return 'complete';
        default:
          return '';
      }
    }

}
