import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../../core/facades';

@Component({
  selector: 'appartoo-test-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      this.authFacade.register(this.registerForm.value);
    }
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
    }
  }
}
