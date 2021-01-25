import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade, UsersFacade } from '../../../core/facades';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models';

@Component({
  selector: 'appartoo-test-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    age: new FormControl(''),
    family: new FormControl(''),
    race: new FormControl(''),
    food: new FormControl(''),
    team: new FormControl(''),
    twitter: new FormControl(''),
    facebook: new FormControl(''),
    firstname: new FormControl('')
  });

  constructor(
    private authFacade: AuthFacade,
    private usersFacade: UsersFacade
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.authFacade.currentPango$.subscribe(
      (user: User) => {
        if (user) {
          this.profileForm.patchValue({
            email: user.email,
            age: user.age,
            family: user.family,
            race: user.race,
            food: user.food,
            team: user.team,
            firstname: user.firstname,
            twitter: user.twitter,
            facebook: user.facebook
          });
        }
      }
    );
  }

  save() {
    if (this.profileForm.valid) {
      this.usersFacade.updateProfile(this.profileForm.value);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
