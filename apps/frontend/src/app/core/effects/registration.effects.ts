import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { AuthService } from '../services';
import { AuthState } from '../reducers';
import {
  loadCurrentPango,
  loadCurrentPangoFailure,
  loadCurrentPangoSuccess,
  loggedOut,
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
} from '../actions';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RegistrationEffects {
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.toastr.success(
            'Vous êtes inscrit sur pango rebels, vous pouvez maintenant vous connecter '
          );
          this.router.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerFailure),
        tap(() => {
          return this.toastr.error('La création de votre compte à échoué');
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ age, email, username, password, firstname }) =>
        this.registrationService
          .register({ age, email, username, password, firstname })
          .pipe(
            map((data) => {
              return registerSuccess({ user: data });
            }),
            catchError((e) => of(registerFailure()))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private registrationService: RegistrationService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
