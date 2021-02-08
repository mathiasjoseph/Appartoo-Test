import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { IUser } from '@pangolin/types';

@Component({
  selector: 'appartoo-test-home',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends$: Observable<IUser[]>;
  constructor(private usersFacade: UsersFacade) {
    this.friends$ = this.usersFacade.friends$;
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  removeFriend(friendId: string) {
    this.usersFacade.removeFriend(friendId);
  }
}
