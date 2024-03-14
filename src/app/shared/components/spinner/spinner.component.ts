import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-spinner',
//   templateUrl: './spinner.component.html',
//   styleUrls: ['./spinner.component.scss']
// })
export abstract class SpinnerComponent {

  constructor(public spinner: NgxSpinnerService) {}

   onEnd(): void {
    this.hideLoader();
  }
   showLoader(): void {
    this.spinner.show();
  }
   hideLoader(): void {
    this.spinner.hide();
  }

}
