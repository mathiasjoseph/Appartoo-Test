import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade, UsersFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { IUser } from '@pangolin/types';

@Component({
  selector: 'appartoo-test-home',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss'],
})
export class FriendRequestsComponent implements OnInit {
  friendRequests$: Observable<IUser[]>;
  constructor(private usersFacade: UsersFacade) {
    this.friendRequests$ = this.usersFacade.friendRequests$;
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  acceptFriend(friendId: string) {
    this.usersFacade.acceptFriend(friendId);
  }
}
