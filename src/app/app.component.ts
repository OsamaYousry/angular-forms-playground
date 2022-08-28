import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator, birthdayValidator, passwordComplexityValidator, usernameValidator} from './validators';
import {SignupModel} from './models/signup.model';
import {delay, map, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;

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
      age: [{value: '', disabled: true}]
    }, {validators: passwordMatchValidator});
  }

  ngOnInit() {
    this.formGroup.controls['dob'].valueChanges.pipe(
      map(dob => (new Date().getTime() - new Date(dob).getTime()) / 31536000000),
      map(age => Math.floor(age)),
      map(age => this.formGroup.controls['dob'].valid ? age : null),
    ).subscribe(age => this.formGroup.controls['age'].setValue(age));
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
        if (control.errors['emailIsForbidden']) {
          return 'This email is already in use';
        }
      }
    }
    return '';
  }

  signup() {
    let {confirmPassword, ...model} = this.formGroup.value as SignupModel & { confirmPassword: string };
    console.log(model);
    this.isLoading = true;
    of(null).pipe(delay(2000)).subscribe(() => {
      this.isLoading = false;
      this.formGroup.controls['email'].setErrors({'emailIsForbidden': true});
    });
  }
}
