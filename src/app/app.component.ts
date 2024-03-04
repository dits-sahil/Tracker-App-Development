import { Component } from '@angular/core';
import { FirebaseService } from './core/services/firebase.service';
import { AuthService } from './core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private db:FirebaseService,
    private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,
    private readonly toastrService: ToastrService,
    private readonly router: Router){}

  ngOnInit(){
  }
  title = 'tracker-app';
}
