import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  static TOKEN_PANGOLIN_KEY = 'currentPango';

  static getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_PANGOLIN_KEY);
  }

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(payload: { username: string; password: string }) {
    return this.http.post<any>(`${this.url}/login`, payload).pipe(
      map((user) => {
        localStorage.setItem(AuthService.TOKEN_PANGOLIN_KEY, user?.token);
        this.router.navigateByUrl('/');
        return user;
      })
    );
  }

  whoAmI() {
    return this.http.get<any>(`${this.url}/me`).pipe(
      map((user) => {
        return user;
      })
    );
  }

  register(payload: { username: string; password: string; email: string }) {
    return this.http.post<any>(`${this.url}/register`, payload).pipe(
      map((user) => {
        localStorage.setItem(AuthService.TOKEN_PANGOLIN_KEY, user?.token);
        this.router.navigateByUrl('/');
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
