import { Component } from '@angular/core';
import { FirebaseService } from './core/services/firebase.service';
import { AuthService } from './core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private db:FirebaseService,
    private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,
    private readonly toastrService: ToastrService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private readonly router: Router){
      this.matIconRegistry.addSvgIcon(
        `bank-name-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/bank.svg'
        )
      );
      this.matIconRegistry.addSvgIcon(
        `bank-branch-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/bank-branch.svg'
        )
      );
      this.matIconRegistry.addSvgIcon(
        `account-holder-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/account-holder.svg'
        )
      );
      this.matIconRegistry.addSvgIcon(
        `account-holder-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/account-holder.svg'
        )
      );
      this.matIconRegistry.addSvgIcon(
        `account-number-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/account-number.svg'
        )
      );
    }
    payload=''
  ngOnInit(){
    // this.firebaseService.getMessage().subscribe(payload => {
    //   this.payload = payload;
    //   console.log('Payload received in component: ', this.payload);
    //   // You can now use this.payload in your component
    // });
  }
  title = 'tracker-app';
}
