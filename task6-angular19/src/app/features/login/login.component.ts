import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  //Form
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async login() {
    this.isLoading = true;
    console.log(this.loginForm);
    try {
      const response = await this.authService.loginUser(this.loginForm.value);
      if (response.success && response.data) {
        console.log(response.message);
        this.router.navigate(['/dashboard']);
        this.userService.setUser(response.data);
      } else {
        console.log(response.message);
        this.error = response.message;
      }
    } catch (error: any) {
      console.log(error.message);
      this.error = error.message;
    }
    this.router.navigate(['/dashboard']);
    this.isLoading = false;
  }
}
