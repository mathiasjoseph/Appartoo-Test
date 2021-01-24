import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState, selectUsersList } from '../reducers';
import { Store } from '@ngrx/store';
import { addFriend, loadUsers, removeFriend, updateProfile } from '../actions';
import { Profile, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  list$: Observable<User[]> = this.store.select(selectUsersList);

  constructor(private store: Store<AuthState>) {
  }

  updateProfile(payload: Profile) {
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
}
