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
      // console.log('effect', this.user());
      if (this.user()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  async canActivate(): Promise<boolean> {
    this.user = this.userService.user;
    console.log('log signal', this.user, this.user());
    if (this.user()) {
      console.log('canActivate guard', this.userService.user());
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
