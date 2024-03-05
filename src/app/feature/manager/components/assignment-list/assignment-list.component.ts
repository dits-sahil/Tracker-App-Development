import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent {
userList:any;
constructor(  private readonly dataService: FirebaseService,){

}
ngOnInit(){}
}
