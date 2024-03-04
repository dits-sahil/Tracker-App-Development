import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { LayoutComponent } from './component/layout/layout.component';
import { HeaderComponent } from './component/layout/header/header.component';
import { UiModule } from '../ui/ui.module';
import { CommonInputComponent } from './components/common-input/common-input.component';
import { CommonSelectComponent } from './components/common-select/common-select.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    CommonInputComponent,
    CommonSelectComponent,
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports:[
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    CommonInputComponent,
    CommonSelectComponent,
  ],
})
export class SharedModule { }
