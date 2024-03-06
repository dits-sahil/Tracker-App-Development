import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }
  public sidenav!: MatSidenav;

  public showHideSidebar = new Subject<any>();
}
