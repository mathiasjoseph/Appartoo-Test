import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginGQL, RegisterGQL } from '@pangolin/graphql';
import { IUser } from '@pangolin/types';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  static TOKEN_PANGOLIN_KEY = 'currentPango';

  constructor(private registerGQL: RegisterGQL) {}

  register(payload: IUser) {
    return this.registerGQL
      .mutate({
        payload: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          age: payload.age,
          firstname: payload.firstname,
        },
      })
      .pipe(map((result) => result.data.register));
  }

  whoAmI() {
    /*    return this.http.get<any>(`${this.url}/me`).pipe(
      map((user) => {
        return user;
      })
    );*/
  }
}
