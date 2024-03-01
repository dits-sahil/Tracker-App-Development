import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../../../core/services/firebase.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
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

  createUser(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    const user = this.registrationForm.value;

    this.firebaseService
      .createUser(user)
      .then((res) => {
        console.log('res:', res)

        console.log('i am in');

        this.toastrService.success('User registred successfuly');
        this.router.navigateByUrl('home');
      })
      .catch((error) => this.toastrService.error(error.message))
      .finally(() => (this.loading = false));
  }
}
