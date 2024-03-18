import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { map } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
// import { AngularFireDatabase} from '@angular/fire/compat/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SpinnerComponent  {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    public override spinner: NgxSpinnerService,
    private  firebaseService: AuthService,
    private  dbService: FirebaseService,
    private  toastrService: ToastrService,
    private storageService: StorageService,
    private  router: Router,
    private dialog: MatDialog,
  ) {
    super(spinner)
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  toggleDisplayPassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.showLoader()
    this.firebaseService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((user: any) => {
        this.getUserData(user)
      })
      .catch((error) => {
        this.toastrService.error(error)
      })
      .finally(() => (this.hideLoader()));
  }


 async getUserData(user:any){
    let userId = user.user.uid
    let accessToken:any = user.user.accessToken
    this.dbService.getDataById('users',userId).subscribe((res:any)=>{
      let finalData = res
      finalData = { ...finalData, accessToken }
      this.firebaseService.setProfileDetails(finalData)
      this.storageService.setStorage('user', finalData)
      this.router.navigate(['/', 'home']);
      this.toastrService.success('User logged in successfuly');
    });
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '40%',
      disableClose: true,
      data: {
      }
    });
  }


}
