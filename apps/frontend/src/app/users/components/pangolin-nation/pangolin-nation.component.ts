import { Component, OnInit } from '@angular/core';
import { AuthFacade, UsersFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { User } from '../../../core/models';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'appartoo-test-pangolin-nation',
  templateUrl: './pangolin-nation.component.html',
  styleUrls: ['./pangolin-nation.component.scss']
})
export class PangolinNationComponent implements OnInit {
  pangolins$: Observable<User[]>;
  currentPangolin$: Observable<User>;

  createFriendForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });


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
        if (c){
          return c.friends.includes(id);
        }
        return false;
      })
    );
  }


  createFriend(){

    console.log(this.createFriendForm.valid)
    if(this.createFriendForm.valid){
      this.usersFacade.createFriend(this.createFriendForm.value);
    }
  }

}
