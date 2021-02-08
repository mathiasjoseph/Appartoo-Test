import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFacade } from '../../../core/facades';

@Component({
  selector: 'appartoo-test-home',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  constructor(private userFacade: UsersFacade) {}
  invitationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    firstname: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}

  get email() {
    return this.invitationForm.controls['email'];
  }

  get firstname() {
    return this.invitationForm.controls['firstname'];
  }

  get password() {
    return this.invitationForm.controls['password'];
  }

  get age() {
    return this.invitationForm.controls['age'];
  }
  get username() {
    return this.invitationForm.controls['username'];
  }

  register() {
    if (this.invitationForm.valid) {
      this.userFacade.inviteUser(this.invitationForm.value);
    }
  }
}
