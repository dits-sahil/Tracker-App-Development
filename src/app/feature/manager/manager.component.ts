import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent extends SpinnerComponent {
  isExpand: boolean = true;
  constructor(private router:Router,
    public override spinner: NgxSpinnerService){
    // router.navigate(['manager','users'])
    super(spinner)
  }
  public expandOffItem(inExpand: boolean) {
    this.isExpand = inExpand
  }

}
