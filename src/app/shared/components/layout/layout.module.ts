import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../../shared.module';
import { UiModule } from 'src/app/ui/ui.module';




@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,UiModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
  ]
})
export class LayoutModule { }
