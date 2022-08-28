import {AbstractControl} from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({mismatch: true});
      return {'mismatch': true};
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }
  return null;
}
