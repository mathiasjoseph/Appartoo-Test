import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { selectCurrentId, selectCurrentPango } from './auth.reducers';
import { loadUsersSuccess, searchUserSuccess } from '../actions';
import { IUser } from '@pangolin/types';

export interface UsersState {
  list: IUser[];
  searchUser: IUser[];
}

export const initialUsersState: UsersState = {
  list: [],
  searchUser: [],
};

export const reducerUsers = createReducer(
  initialUsersState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    list: users,
  })),
  on(searchUserSuccess, (state, { users }) => ({
    ...state,
    searchUser: users,
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
  (state: UsersState, currentId) => {
    return state.list.filter((i) => i['id'] !== currentId);
  }
);

export const selectFriendRequest = createSelector(
  selectPangoUsersState,
  selectCurrentPango,
  (state: UsersState, currentUser) => {
    return state.list.filter((user) =>
      currentUser.friendRequests.includes(user.id)
    );
  }
);

export const selectFriends = createSelector(
  selectPangoUsersState,
  selectCurrentPango,
  (state: UsersState, currentUser) => {
    return state.list.filter((user) => currentUser.friendIds.includes(user.id));
  }
);

export const selectSearchUser = createSelector(
  selectPangoUsersState,
  (state: UsersState) => state.searchUser
);
