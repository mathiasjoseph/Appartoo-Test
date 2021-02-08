import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../../core/facades';

@Component({
  selector: 'appartoo-test-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(protected authFacade: AuthFacade) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
    }
  }
}
