import {AbstractControl} from '@angular/forms';

export function passwordComplexityValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.value;
  if (password) {
    if (password.length < 8) {
      return {'passwordLength': true};
    }
    if (!password.match(/[A-Z]/)) {
      return {'passwordUppercase': true};
    }
    if (!password.match(/[a-z]/)) {
      return {'passwordLowercase': true};
    }
    if (!password.match(/[0-9]/)) {
      return {'passwordNumber': true};
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      return {'passwordSpecial': true};
    }
  }
  return null;
}
