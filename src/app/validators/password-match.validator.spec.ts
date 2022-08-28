import {FormControl, FormGroup} from '@angular/forms';
import {passwordMatchValidator} from './password-match.validator';

describe("PasswordMatchValidator", () => {
  let formControl: FormGroup;
  let validator = passwordMatchValidator;
  beforeEach(() => {
    formControl = new FormGroup({
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  });
  it("should return null if the control is valid", () => {
    formControl.get('password')!.setValue('password');
    formControl.get('confirmPassword')!.setValue('password');
    expect(validator(formControl)).toBeNull();
  });
  it("should return an error if the control is invalid", () => {
    formControl.get('password')!.setValue('password');
    formControl.get('confirmPassword')!.setValue('password1');
    expect(validator(formControl)).toEqual({'mismatch': true});
  });
});
