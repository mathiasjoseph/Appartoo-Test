import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IProfile, IUser } from '@pangolin/types';
import { map } from 'rxjs/operators';
import {
  SearchUserGQL,
  InviteUserGQL,
  UsersGQL,
  AddFriendGQL,
  RemoveFriendGQL,
  UpdateProfileGQL,
  AcceptFriendGQL,
} from '@pangolin/graphql';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private searchUserGQL: SearchUserGQL,
    private inviteUserGQL: InviteUserGQL,
    private usersGQL: UsersGQL,
    private addFriendGQL: AddFriendGQL,
    private removeFriendGQL: RemoveFriendGQL,
    private updateProfileGQL: UpdateProfileGQL,
    private acceptFriendGQL: AcceptFriendGQL
  ) {}

  updateProfile(payload: IProfile) {
    return this.updateProfileGQL
      .mutate({
        profile: {
          age: payload.age,
          family: payload.family,
          race: payload.race,
          firstname: payload.firstname,
          food: payload.food,
          team: payload.team,
          twitter: payload.twitter,
          facebook: payload.facebook,
        },
      })
      .pipe(map((result) => result.data.updateProfile));
  }

  createFriend(payload: IUser) {
    return this.inviteUserGQL
      .mutate({
        payload: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          age: payload.age,
          firstname: payload.firstname,
        },
      })
      .pipe(map((result) => result.data.inviteUser));
  }

  addFriend(friendId: string) {
    return this.addFriendGQL
      .mutate({
        friendId,
      })
      .pipe(map((result) => result.data.addFriend));
  }

  acceptFriend(friendId: string) {
    return this.acceptFriendGQL
      .mutate({
        friendId,
      })
      .pipe(map((result) => result.data.acceptFriend));
  }

  removeFriend(friendId: string) {
    return this.removeFriendGQL
      .mutate({
        friendId,
      })
      .pipe(map((result) => result.data.removeFriend));
  }

  allUsers(): Observable<IUser[]> {
    return this.usersGQL
      .watch(
        {},
        {
          fetchPolicy: 'network-only',
        }
      )
      .valueChanges.pipe(map((result) => result.data.users));
  }

  searchUser(text: string) {
    return this.searchUserGQL
      .watch(
        { search: text },
        {
          fetchPolicy: 'network-only',
        }
      )
      .valueChanges.pipe(map((result) => result.data.searchUser));
  }
}
