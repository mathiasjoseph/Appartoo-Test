import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState, selectCurrentPango, selectLoggedIn } from '../reducers';
import { Store } from '@ngrx/store';
import { loadCurrentPango, login, logout, register } from '../actions';
import { IUser } from '@pangolin/types';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  currentPango$: Observable<IUser> = this.store.select(selectCurrentPango);
  isLoggedIn$ = this.store.select(selectLoggedIn);

  constructor(private store: Store<AuthState>) {}

  login(payload: { email: string; password: string }) {
    this.store.dispatch(login(payload));
  }

  loadCurrentPango() {
    this.store.dispatch(loadCurrentPango());
  }

  register(payload: {
    username: string;
    password: string;
    email: string;
    age: number;
    firstname: string;
  }) {
    this.store.dispatch(register(payload));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
