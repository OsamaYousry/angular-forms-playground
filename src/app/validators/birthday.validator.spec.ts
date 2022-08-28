import {FormControl} from '@angular/forms';
import {birthdayValidator} from './birthday.validator';

describe('BirthdayValidator', () => {
  let formControl: FormControl;
  let validator = birthdayValidator;
  beforeEach(() => {
    formControl = new FormControl();
    jasmine.clock().mockDate(new Date(2018, 0, 1));
  });
  it('should return null if the control is valid', () => {
    formControl.setValue('01/01/2000');
    expect(validator(formControl)).toBeNull();
  });
  it('should return an error if the control is invalid', () => {
    formControl.setValue('01/12/2017');
    expect(validator(formControl)).toEqual({'ageError': true});
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
