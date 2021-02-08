import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../../core/facades';

@Component({
  selector: 'appartoo-test-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    firstname: new FormControl('', Validators.required),
  });

  constructor(protected authFacade: AuthFacade) {}

  ngOnInit(): void {}

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get age() {
    return this.registerForm.controls['age'];
  }
  get username() {
    return this.registerForm.controls['username'];
  }

  get firstname() {
    return this.registerForm.controls['firstname'];
  }

  register() {
    if (this.registerForm.valid) {
      this.authFacade.register(this.registerForm.value);
    }
  }
}
