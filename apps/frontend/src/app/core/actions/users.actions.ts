import { createAction, props } from '@ngrx/store';
import { Profile, User } from '../models';

export const updateProfile = createAction(
  '[Users] Pango Update Profile',
  props<Profile>()
);
export const updateProfileFailure = createAction(
  '[Users] Update Profile Failure'
);
export const updateProfileSuccess = createAction(
  '[Users] Update Profile Success',
  props<{ user: User }>()
);

export const loadUsers = createAction('[Auth] Pango Load Users');
export const loadUsersFailure = createAction('[Users] Load Users Failure');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const addFriend = createAction(
  '[Users] Pango Add Friend',
  props<{ friendId: string }>()
);
export const addFriendFailure = createAction('[Users] Add Friend Failure');
export const addFriendSuccess = createAction(
  '[Users] Add Friend Success',
  props<{ user: User }>()
);

export const removeFriend = createAction(
  '[Users] Pango Remove Friend',
  props<{ friendId: string }>()
);
export const removeFriendFailure = createAction('[Users] Add Remove Failure');
export const removeFriendSuccess = createAction(
  '[Users] Add Remove Success',
  props<{ user: User }>()
);

export const createFriend = createAction(
  '[Users] Pango Create Friend',
  props<{ username: string; password: string; email: string }>()
);
export const createFriendFailure = createAction('[Users] Create Friend Failure');
export const createFriendSuccess = createAction(
  '[Users] Create Friend Success',
  props<{ user: User }>()
);
