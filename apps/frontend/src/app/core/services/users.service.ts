import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, User } from '../models';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  updateProfile(payload: Profile) {
    return this.http.post<any>(`${this.url}/profile/update`, payload).pipe(
      map((user) => {
        return user;
      })
    );
  }

  addFriend(friendId: string) {
    return this.http
      .post<any>(`${this.url}/friends/${friendId}/add`, null)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  removeFriend(friendId: string) {
    return this.http
      .post<any>(`${this.url}/friends/${friendId}/remove`, null)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  allUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.url}/users`).pipe(
      map((users) => {
        return users;
      })
    );
  }
}
