import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginGQL, WhoAmIGQL } from '@pangolin/graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static TOKEN_PANGOLIN_KEY = 'currentPango';

  static getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_PANGOLIN_KEY);
  }

  static clearToken(): void {
    localStorage.removeItem(AuthService.TOKEN_PANGOLIN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_PANGOLIN_KEY, token);
  }

  constructor(private loginGQL: LoginGQL, private whoAmIGQL: WhoAmIGQL) {}

  login(payload: { email: string; password: string }) {
    return this.loginGQL
      .mutate({
        payload,
      })
      .pipe(map((result) => result.data.login));
  }

  whoAmI() {
    return this.whoAmIGQL
      .watch(
        {},
        {
          fetchPolicy: 'network-only',
        }
      )
      .valueChanges.pipe(map((result) => result.data.whoAmI));
  }
}
