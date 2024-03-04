import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { CommonInputComponent } from './components/common-input/common-input.component';
import { CommonSelectComponent } from './components/common-select/common-select.component';



@NgModule({
  declarations: [
    CommonInputComponent,
    CommonSelectComponent,
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports:[
    CommonInputComponent,
    CommonSelectComponent,
  ]
})
export class SharedModule { }
