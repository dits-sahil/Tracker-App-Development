import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,private validationService: ValidationService,
    private authService:AuthService,private readonly toastrService: ToastrService){}

    forgotPasswordForm!: FormGroup;

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.forgotPasswordForm, label);
  }

  forgot(){
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.authService.sendForgotPasswordEmail(this.forgotPasswordForm.value.email).subscribe((res:any)=>{
      if(res){
      window.location = res.link;
      this.toastrService.success('Redirecting to reset password link !!!');
      }
    },(error)=>{
      this.dialogRef.close();
      this.toastrService.error('Please enter a valid email address or try again after some time');
    }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
