import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private readonly router: Router,) { }
  sidenavWidth = 4;
  ngStyle!: string;
  SideNavToggle: any

  @Output() closeSideNav = new EventEmitter();

  openSidenav() {
    this.SideNavToggle.emit();
  }
  onclick() {


  }
  onToggleClose() {
    this.router.navigate(['/users'])
    this.closeSideNav.emit();
  }


}

