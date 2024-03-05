import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-note-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(private Router:Router){

  }

  ngOnInit(){
  }

  BacktoLogin(){
    this.Router.navigate(['/login'])
  }
}
