import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
// import { AngularFireDatabase} from '@angular/fire/compat/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private readonly firebaseService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

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

    this.loading = true;
debugger
    this.firebaseService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((user:any) => {
        this.toastrService.success('User logged in successfuly');
        this.router.navigate(['/', 'admin']);
      })
      .catch((error) =>  {console.log('error',error);
       this.toastrService.error('sasas')})
      .finally(() => (this.loading = false));
  }
}
