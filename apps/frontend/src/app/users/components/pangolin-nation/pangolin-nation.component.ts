import { Component, OnInit } from '@angular/core';
import { AuthFacade, UsersFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@pangolin/types';

@Component({
  selector: 'appartoo-test-pangolin-nation',
  templateUrl: './pangolin-nation.component.html',
  styleUrls: ['./pangolin-nation.component.scss'],
})
export class PangolinNationComponent implements OnInit {
  pangolins$: Observable<IUser[]>;
  currentPangolin$: Observable<IUser>;

  constructor(
    private authFacade: AuthFacade,
    private usersFacade: UsersFacade
  ) {
    this.pangolins$ = this.usersFacade.list$;
    this.currentPangolin$ = this.authFacade.currentPango$;
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  addFriend(friendId: string) {
    this.usersFacade.addFriend(friendId);
  }

  removeFriend(friendId: string) {
    this.usersFacade.removeFriend(friendId);
  }

  isFriend(id: string): Observable<boolean> {
    return this.currentPangolin$.pipe(
      map((c) => {
        if (c) {
          return c.friendIds.includes(id);
        }
        return false;
      })
    );
  }

  isPendingFriend(id: string): Observable<boolean> {
    return this.currentPangolin$.pipe(
      map((c) => {
        if (c) {
          return c.friendRequestSubmissions.includes(id);
        }
        return false;
      })
    );
  }
}
