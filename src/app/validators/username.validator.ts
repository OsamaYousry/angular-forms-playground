import {AbstractControl} from '@angular/forms';
import {delay, Observable, of, switchMap, tap} from 'rxjs';

export function usernameValidator(control: AbstractControl): Observable<{ [key: string]: boolean } | null> {
  control.markAsTouched();
  return of(control.value).pipe(
    delay(500),
    switchMap(value => {
      return of(value === 'test' ? {'usernameIsForbidden': true} : null).pipe(
        tap(() => console.log('FIRED')),
        delay(2000)
      );
    }),
  );
}
