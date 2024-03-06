import { Component } from '@angular/core';

@Component({
  selector: 'app-a-assignment-list',
  templateUrl: './a-assignment-list.component.html',
  styleUrls: ['./a-assignment-list.component.scss']
})
export class AAssignmentListComponent {

  columnHeadings = ['index', 'title', 'description', 'dueDate', 'priority', 'status', 'actions'];
  showPopupBox: boolean = false;
  openManageAssignmentPopup(){
    this.showPopupBox = true;
  }
  closeDialog(isChanged: any){
    if(isChanged){}
    this.showPopupBox = false;

  }
}
