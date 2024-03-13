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

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,private validationService: ValidationService,private authService:AuthService,
    private readonly toastrService: ToastrService){}
  
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

    this.authService.sendForgotPasswordEmail(this.forgotPasswordForm.value.email).then((item:any)=>{
      console.log('item:', item)
    }).catch((error:any) => this.toastrService.error(error.message))
      .finally(() => (console.log));
    
    // this.toastrService.success('User registred successfuly');
    //     this.router.navigateByUrl('home');
      
   
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
