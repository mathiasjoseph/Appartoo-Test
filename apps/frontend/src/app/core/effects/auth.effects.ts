import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';

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
  registerSuccess
} from '../actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        localStorage.removeItem(AuthService.TOKEN_PANGOLIN_KEY);
        this.router.navigateByUrl('/auth');
        return loggedOut();
      })
    )
  );

  loginSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => {
        this.router.navigateByUrl('/');
        return loadCurrentPango();
      })
    )
  );

  registerSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccess),
      map(() => {
        return loadCurrentPango();
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

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap((payload) =>
        this.authService.register(payload).pipe(
          map((data) => {
            console.log(data);
            return registerSuccess({ user: data });
          }),
          catchError((e) => of(registerFailure()))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((payload) =>
        this.authService.login(payload).pipe(
          map((data) => {
            console.log(data);
            return loginSuccess({ user: data });
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
    private router: Router
  ) {
  }
}
