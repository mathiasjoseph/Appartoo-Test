import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade, UsersFacade } from '../../../core/facades';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '@pangolin/types';

@Component({
  selector: 'appartoo-test-home',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  profileSub$: Subscription;
  profileForm = new FormGroup({
    age: new FormControl(''),
    family: new FormControl(''),
    race: new FormControl(''),
    food: new FormControl(''),
    team: new FormControl(''),
    twitter: new FormControl(''),
    facebook: new FormControl(''),
    firstname: new FormControl(''),
  });
  constructor(
    private authFacade: AuthFacade,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.authFacade.loadCurrentPango();
    this.profileSub$ = this.authFacade.currentPango$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          age: user.age,
          family: user.family,
          race: user.race,
          firstname: user.firstname,
          food: user.food,
          team: user.team,
          twitter: user.twitter,
          facebook: user.facebook,
        });
      }
    });
  }
  get age() {
    return this.profileForm.controls['age'];
  }
  get family() {
    return this.profileForm.controls['family'];
  }
  get race() {
    return this.profileForm.controls['race'];
  }
  get firstname() {
    return this.profileForm.controls['firstname'];
  }
  get food() {
    return this.profileForm.controls['food'];
  }
  get team() {
    return this.profileForm.controls['team'];
  }
  get twitter() {
    return this.profileForm.controls['twitter'];
  }

  get facebook() {
    return this.profileForm.controls['facebook'];
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.usersFacade.updateProfile(this.profileForm.value);
    }
  }

  ngOnDestroy() {
    this.profileSub$.unsubscribe();
  }
}
