import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Input() userDetails: any
  profileForm!: FormGroup;
  isReadOnly: boolean = false
  gender: any[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' }
  ];
  profileImage:any;

  constructor(private authService: AuthService, private validationService: ValidationService,
    private dbService: FirebaseService, private toastrService: ToastrService,) { }
  ngOnInit() {
  this.initializeForm();
  this.loggedUser();
  }

  initializeForm() {
    this.profileForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      gender: new FormControl<string>('', [
        Validators.required,
      ]),
      phoneNumber: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      profileImage: new FormControl<any>('', [])
    });
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.profileForm, label);
  }

  getGender(val: any) {
    this.profileForm.get('gender')?.setValue(val);
  }

  get getLoggedInUserRole() {
    return this.authService.loggedInUserRole()
  }


  loggedUser(){
    this.userDetails = this.authService.loggedInUser();
    this.isReadOnly = true
    this.profileForm.patchValue({
      name: this.userDetails.name,
      gender: this.userDetails.gender,
      role: this.userDetails.role,
      phoneNumber: this.userDetails.phoneNumber,
      email: this.userDetails.email,
      profileImage: this.userDetails.profileImage 

    });
    this.profileImage = this.userDetails.profileImage 
  }
  
  updateuserDetails() {
    let uid = this.userDetails.uid
    this.dbService.update('users', uid, this.profileForm.value)
    this.toastrService.success('User updated successfully');
  }

}
