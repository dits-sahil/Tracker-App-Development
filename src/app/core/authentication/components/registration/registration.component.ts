import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  showPassword = false;
  loading = false;
  roles:any[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'User' }
  ];
  constructor(
    private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private validationService: ValidationService,
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      role: new FormControl<string>('', [
        Validators.required,
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.registrationForm, label);
  }

  toggleDisplayPassword(): void {
    this.showPassword = !this.showPassword;
  }
  getRole(val:any){
    this.registrationForm.get('role')?.setValue(val);
  }
  createUser() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.loading = true;
    let user:any = this.registrationForm.value;
    this.firebaseService
      .createUser(user)
      .then((res:any) => {
        let uid = res.user.uid
        delete user.password
        user = {...user,uid}
        this.dataService.set('users',res.user.uid,user)
        localStorage.setItem('user',JSON.stringify(user))
        this.toastrService.success('User registred successfuly');
        this.router.navigateByUrl('home');
      })
      .catch((error:any) => this.toastrService.error(error.message))
      .finally(() => (this.loading = false));
  }
}
