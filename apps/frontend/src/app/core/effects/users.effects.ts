import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { AuthState } from '../reducers';
import {
  addFriend,
  addFriendFailure,
  addFriendSuccess,
  loadCurrentPangoSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeFriend,
  removeFriendFailure,
  removeFriendSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess
} from '../actions';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersEffects {
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      mergeMap((payload) =>
        this.usersService.updateProfile(payload).pipe(
          map((data) => {
            this.store.dispatch(loadCurrentPangoSuccess({ user: data }));
            return updateProfileSuccess({ user: data });
          }),
          catchError((e) => of(updateProfileFailure()))
        )
      )
    )
  );

  addFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFriend),
      mergeMap(({ friendId }) =>
        this.usersService.addFriend(friendId).pipe(
          map((data) => {
            this.store.dispatch(loadCurrentPangoSuccess({ user: data }));
            return addFriendSuccess({ user: data });
          }),
          catchError((e) => of(addFriendFailure()))
        )
      )
    )
  );

  removeFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFriend),
      mergeMap(({ friendId }) =>
        this.usersService.removeFriend(friendId).pipe(
          map((data) => {
            this.store.dispatch(loadCurrentPangoSuccess({ user: data }));
            return removeFriendSuccess({ user: data });
          }),
          catchError((e) => of(removeFriendFailure()))
        )
      )
    )
  );

  loadUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap((payload) =>
        this.usersService.allUsers().pipe(
          map((data) => {
            return loadUsersSuccess({ users: data });
          }),
          catchError((e) => of(loadUsersFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private usersService: UsersService
  ) {
  }
}
