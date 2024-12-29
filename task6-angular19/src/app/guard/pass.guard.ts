import { Injectable, Signal, computed, effect } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../interface/interface';

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
