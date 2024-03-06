import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../../shared.module';
import { UiModule } from 'src/app/ui/ui.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { AccountComponentsComponent } from './components/header/account-components/account-components.component';




@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    AccountComponentsComponent
  ],
  imports: [
    CommonModule,UiModule, LayoutRoutingModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    AccountComponentsComponent
  ]
})
export class LayoutModule { }
