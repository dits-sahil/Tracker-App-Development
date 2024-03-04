import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { LayoutComponent } from './component/layout/layout.component';
import { HeaderComponent } from './component/layout/header/header.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LayoutComponent,
    SidebarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
