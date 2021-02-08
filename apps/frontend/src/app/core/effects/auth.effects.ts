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
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  loginSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(({ token }) => {
        this.toastr.success('Vous êtes connecté(e) ');
        AuthService.setToken(token);
        this.router.navigateByUrl('/home');
        return loadCurrentPango();
      })
    )
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(() => {
          this.toastr.error('Identifiants incorrects ');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        AuthService.clearToken();
        this.router.navigateByUrl('/auth/login');
        return loggedOut();
      })
    )
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentPango),
      mergeMap(() =>
        this.authService.whoAmI().pipe(
          map((data) => {
            console.log(data);
            return loadCurrentPangoSuccess({ user: data });
          }),
          catchError((e) => of(loadCurrentPangoFailure()))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((data) => {
            return loginSuccess({ user: data.user, token: data.token });
          }),
          catchError((e) => {
            console.log(e);
            return of(loginFailure());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
