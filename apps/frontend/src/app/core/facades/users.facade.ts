import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthState,
  selectFriendRequest,
  selectFriends,
  selectSearchUser,
  selectUsersList,
} from '../reducers';
import { Store } from '@ngrx/store';
import {
  acceptFriend,
  addFriend,
  inviteUser,
  loadUsers,
  removeFriend,
  searchUser,
  updateProfile,
} from '../actions';
import { IProfile, IUser } from '@pangolin/types';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  list$: Observable<IUser[]> = this.store.select(selectUsersList);
  searchResult$: Observable<IUser[]> = this.store.select(selectSearchUser);
  friendRequests$: Observable<IUser[]> = this.store.select(selectFriendRequest);
  friends$: Observable<IUser[]> = this.store.select(selectFriends);

  constructor(private store: Store<AuthState>) {}

  updateProfile(payload: IProfile) {
    this.store.dispatch(updateProfile(payload));
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  removeFriend(friendId: string) {
    this.store.dispatch(removeFriend({ friendId }));
  }

  addFriend(friendId: string) {
    this.store.dispatch(addFriend({ friendId }));
  }
  acceptFriend(friendId: string) {
    this.store.dispatch(acceptFriend({ friendId }));
  }

  inviteUser(payload: {
    username: string;
    password: string;
    email: string;
    age: number;
    firstname: string;
  }) {
    this.store.dispatch(inviteUser({ ...payload }));
  }

  searchUser(text: string) {
    this.store.dispatch(searchUser({ text }));
  }
}
