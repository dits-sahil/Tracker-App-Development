import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  role: any;
  constructor(private readonly router: Router,) { }
  @Input() inputIsExpand: boolean = true
  @Output() getExpandSidebar = new EventEmitter<boolean>();

  @Output() closeSideNav = new EventEmitter();

  ngOninit(){
    debugger
    this.role = localStorage.getItem('role');
  }



}

