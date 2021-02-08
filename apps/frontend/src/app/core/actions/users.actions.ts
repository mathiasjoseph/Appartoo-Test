import { createAction, props } from '@ngrx/store';
import { IProfile, IUser } from '@pangolin/types';
export const updateProfile = createAction(
  '[Users] Pango Update Profile',
  props<IProfile>()
);
export const updateProfileFailure = createAction(
  '[Users] Update Profile Failure'
);
export const updateProfileSuccess = createAction(
  '[Users] Update Profile Success',
  props<{ user: IUser }>()
);

export const loadUsers = createAction('[Auth] Pango Load Users');
export const loadUsersFailure = createAction('[Users] Load Users Failure');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: IUser[] }>()
);

export const acceptFriend = createAction(
  '[Users] Pango Accept Friend',
  props<{ friendId: string }>()
);
export const acceptFriendFailure = createAction(
  '[Users] Accept Friend Failure'
);
export const acceptFriendSuccess = createAction(
  '[Users] Accept Friend Success',
  props<{ user: IUser }>()
);

export const addFriend = createAction(
  '[Users] Pango Add Friend',
  props<{ friendId: string }>()
);
export const addFriendFailure = createAction('[Users] Add Friend Failure');
export const addFriendSuccess = createAction(
  '[Users] Add Friend Success',
  props<{ user: IUser }>()
);

export const removeFriend = createAction(
  '[Users] Pango Remove Friend',
  props<{ friendId: string }>()
);
export const removeFriendFailure = createAction('[Users] Add Remove Failure');
export const removeFriendSuccess = createAction(
  '[Users] Add Remove Success',
  props<{ user: IUser }>()
);

export const searchUser = createAction(
  '[Users] Search User',
  props<{ text: string }>()
);
export const searchUserSuccess = createAction(
  '[Users] Search User Success',
  props<{ users: IUser[] }>()
);
export const searchUserFailure = createAction(
  '[Users] Search User Failure',
  props<{ text: string }>()
);

export const inviteUser = createAction(
  '[Users] Invite User',
  props<{
    username: string;
    password: string;
    email: string;
    age: number;
    firstname: string;
  }>()
);
export const inviteUserSuccess = createAction(
  '[Users] Invite User Success',
  props<{ user: IUser }>()
);
export const inviteUserFailure = createAction(
  '[Users] Invite User Failure',
  props<{
    username: string;
    password: string;
    email: string;
    age: number;
    firstname: string;
  }>()
);
