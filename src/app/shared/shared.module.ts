import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { CommonInputComponent } from './components/common-input/common-input.component';
import { CommonSelectComponent } from './components/common-select/common-select.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    CommonInputComponent,
    CommonSelectComponent,
    CommonTableComponent,
    PageNotFoundComponent
  ],  
  imports: [
    CommonModule,
    UiModule,

  ],
  exports:[
    CommonInputComponent,
    CommonSelectComponent,
    CommonTableComponent

  ],
})
export class SharedModule { }
