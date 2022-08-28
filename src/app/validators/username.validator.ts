import {AbstractControl} from '@angular/forms';
import {delay, mapTo, Observable, of} from 'rxjs';

export function usernameValidator(control: AbstractControl): Observable<{ [key: string]: boolean } | null> {
  control.markAsTouched();
  return of(null).pipe(
    mapTo(control.value === 'test' ? {'usernameIsForbidden': true} : null),
    delay(2000)
  );
}
