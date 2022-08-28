import {AbstractControl} from '@angular/forms';

export function birthdayValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const dob = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  if (age < 5) {
    return {'ageError': true};
  }
  return null;
}
