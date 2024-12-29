import { CanActivate, Router } from '@angular/router';
import { Injectable, Signal, effect } from '@angular/core';

import { User } from '../interface/interface';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class PassGuard implements CanActivate {
  private user: Signal<User | null>;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.user = this.userService.user;
    effect(() => {
      if (this.user()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  async canActivate(): Promise<boolean> {
    this.user = this.userService.user;
    if (this.user()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
