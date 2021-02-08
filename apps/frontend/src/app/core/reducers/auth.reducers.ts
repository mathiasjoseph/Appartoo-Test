import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { loadCurrentPangoSuccess, loggedOut, loginSuccess } from '../actions';
import { IUser } from '@pangolin/types';

export interface AuthState {
  currentPango: IUser;
  id: string;
  loggedIn: boolean;
}

export const initialState: AuthState = {
  currentPango: null,
  id: null,
  loggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(loginSuccess, (state) => ({
    ...state,
    loggedIn: true,
  })),
  on(loadCurrentPangoSuccess, (state, { user }) => ({
    ...state,
    currentPango: user,
    id: user['id'],
  })),
  on(loggedOut, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function pangoAuthReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectPangoAuthState = createFeatureSelector<AuthState>(
  'pango-auth'
);
export const selectCurrentPango = createSelector(
  selectPangoAuthState,
  (state: AuthState) => state.currentPango
);

export const selectCurrentId = createSelector(
  selectPangoAuthState,
  (state: AuthState) => state.id
);

export const selectLoggedIn = createSelector(
  selectPangoAuthState,
  (state: AuthState) => state.loggedIn
);
