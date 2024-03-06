import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  constructor() { }

  getErrorValidationMessages(value: string, form: FormGroup, label: string): string {
    let control = form.controls[value];
    if (!control) {
      return ''; // Return an empty string for unknown fields
    }
    if (control.hasError('required')) {
      return `${label} is required `;
    }

    switch (value) {
      case 'email':
      case 'password':
      case 'role':
      case 'name':
        if (control.hasError('minlength')) {
          return 'Not a valid min length';
        }
        if (control.hasError('pattern')) {
          return 'Enter only characters';
        }

        if (control.hasError('maxlength')) {
          return 'Not a valid max length';
        }

        if (control.hasError('max')) {
          if(control.getError('max').max !== 0){
            return `Value should be less than or equal to ${control.getError('max').max}`;
          }else{
            return `Value should be  equal to ${control.getError('max').max}`;
          }
        }
        break;

        case 'phoneNumber':
          if (control.hasError('minlength')) {
            return 'Not a valid min length';
          }
          if (control.hasError('maxlength')) {
            return 'Not a valid max length';
          }
          break;

      case 'gender':
        return ''; // No additional error message for 'gender'
        break;

      case 'email':
        if (control.hasError('pattern')) {
          return 'Enter a valid email address';
        }
        break;

      case 'password':
        if (control.hasError('minlength')) {
          return 'Not a valid min length';
        }
        if (control.hasError('pattern')) {
          return 'Password must have at least 8 characters along with one upper case, one lower case, one digit, and one special character.';
        }
        break;

      case 'password_confirmation':
        const confirmPassword = control.value;
        const password = form.controls['password'].value;
        if (control.hasError('minlength')) {
          return 'Not a valid min length';
        }
        if (confirmPassword !== password) {
          return 'Passwords do not match';
        }
        break;

        case 'oldPassword':
          if (control.hasError('required')) {
            return 'This Field is required';
          }
          break;

      case 'streetNumber':
      case 'streetName':
      case 'suburb':
        if (control.hasError('minlength')) {
          return 'Not a valid min length';
        }
        break;
      case 'postcode':
        if (control.hasError('pattern')) {
          return 'Please enter a correct zip code';
        }
        break;

      default:
        return ''; // Return an empty string for unknown fields
    }

    return ''; // Return an empty string by default if no error is found
  }
}
