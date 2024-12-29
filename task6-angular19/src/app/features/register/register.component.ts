import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  //Form
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  //Register Method
  async register() {
    this.isLoading = true;
    try {
      const response = await this.authService.registerUser(
        this.registerForm.value,
      );
      if (response.success && response.data) {
        this.router.navigate(['/login']);
      } else {
        this.error = response.message;
      }
    } catch (error: any) {
      console.error('Error registering user: ' + error.message);
      this.error = 'Unable to Register User';
    }
    this.isLoading = false;
  }
}
