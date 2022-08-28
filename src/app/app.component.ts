import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator, birthdayValidator, passwordComplexityValidator, usernameValidator} from './validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], [usernameValidator]],
      password: ['', [Validators.required, passwordComplexityValidator]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required, birthdayValidator]],
    }, {validator: passwordMatchValidator});
  }

  getErrorMessage(control: AbstractControl | null) {
    if (control) {
      if (control.errors) {
        if (control.errors['required']) {
          return 'This field is required';
        }
        if (control.errors['email']) {
          return 'This is not a valid email';
        }
        if (control.errors['ageError']) {
          return 'Please enter a valid birth date';
        }
        if (control.errors['mismatch']) {
          return 'Passwords do not match';
        }
        if (control.errors['passwordLength']) {
          return 'Password must be at least 8 characters';
        }
        if (control.errors['passwordUppercase']) {
          return 'Password must contain at least one uppercase letter';
        }
        if (control.errors['passwordLowercase']) {
          return 'Password must contain at least one lowercase letter';
        }
        if (control.errors['passwordNumber']) {
          return 'Password must contain at least one number';
        }
        if (control.errors['passwordSpecial']) {
          return 'Password must contain at least one special character';
        }
        if (control.errors['usernameIsForbidden']) {
          return 'Username is forbidden';
        }
      }
    }
    return '';
  }
}
