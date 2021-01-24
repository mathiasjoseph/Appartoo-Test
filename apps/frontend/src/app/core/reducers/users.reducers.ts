import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../models';
import { selectCurrentId } from './auth.reducers';
import { loadUsersSuccess } from '../actions';

export interface UsersState {
  list: User[];
}

export const initialUsersState: UsersState = {
  list: []
};

export const reducerUsers = createReducer(
  initialUsersState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    list: users
  }))
);

export function pangoUsersReducer(
  state: UsersState | undefined,
  action: Action
) {
  return reducerUsers(state, action);
}

export const selectPangoUsersState = createFeatureSelector<UsersState>(
  'pango-users'
);

export const selectUsersList = createSelector(
  selectPangoUsersState,
  selectCurrentId,
  (state: UsersState, currentId) =>
    state.list.filter((i) => i['_id'] !== currentId)
);
