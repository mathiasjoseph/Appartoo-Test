import { createAction, props } from '@ngrx/store';
import { IUser } from '@pangolin/types';

export const login = createAction(
  '[Auth] Pango Login',
  props<{ email: string; password: string }>()
);
export const loginFailure = createAction('[Auth] Login Pango Failure');
export const loginSuccess = createAction(
  '[Auth] Login Pango Success',
  props<{ user: IUser; token: string }>()
);

export const register = createAction(
  '[Auth] Pango Register',
  props<{
    username: string;
    password: string;
    email: string;
    age: number;
    firstname: string;
  }>()
);
export const registerFailure = createAction('[Auth] Register Pango Failure');
export const registerSuccess = createAction(
  '[Auth] Register Pango Success',
  props<{ user: IUser }>()
);

export const logout = createAction('[Auth] Logout');

export const loggedOut = createAction('[Auth] Logged out');

export const loadCurrentPango = createAction('[Auth] Load Current Pango');

export const loadCurrentPangoSuccess = createAction(
  '[Auth] Current Pango Loaded',
  props<{ user: IUser }>()
);

export const loadCurrentPangoFailure = createAction(
  '[Auth] Load Current Pango Failure'
);
