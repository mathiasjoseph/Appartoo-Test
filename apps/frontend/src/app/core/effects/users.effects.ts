import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { AuthState } from '../reducers';
import {
  acceptFriend,
  acceptFriendFailure,
  acceptFriendSuccess,
  addFriend,
  addFriendFailure,
  addFriendSuccess,
  inviteUser,
  inviteUserFailure,
  inviteUserSuccess,
  loadCurrentPango,
  loadCurrentPangoSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  registerSuccess,
  removeFriend,
  removeFriendFailure,
  removeFriendSuccess,
  searchUser,
  searchUserFailure,
  searchUserSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
} from '../actions';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
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

  acceptFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptFriend),
      mergeMap(({ friendId }) =>
        this.usersService.acceptFriend(friendId).pipe(
          map((data) => {
            this.store.dispatch(loadCurrentPangoSuccess({ user: data }));
            return acceptFriendSuccess({ user: data });
          }),
          catchError((e) => of(acceptFriendFailure()))
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

  inviteFriendSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(inviteUserSuccess),
        tap(() => {
          this.toastr.success('Le compte de votre amis est crée ');
        })
      ),
    { dispatch: false }
  );

  inviteFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inviteUser),
      mergeMap(({ age, email, username, password, firstname }) =>
        this.usersService
          .createFriend({ age, email, username, password, firstname })
          .pipe(
            map((data) => {
              this.store.dispatch(loadCurrentPango());
              return inviteUserSuccess({ user: data });
            }),
            catchError((e) =>
              of(
                inviteUserFailure({ age, email, username, password, firstname })
              )
            )
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

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchUser),
      mergeMap(({ text }) =>
        this.usersService.searchUser(text).pipe(
          map((data) => {
            return searchUserSuccess({ users: data });
          }),
          catchError((e) => of(searchUserFailure({ text })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}
}
