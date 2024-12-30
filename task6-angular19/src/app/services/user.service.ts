import { Injectable } from '@angular/core';
import { WritableSignal, signal } from '@angular/core';

import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: WritableSignal<User | null> = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor() {
    const user = localStorage.getItem('LoggedUser');
    if (user) {
      const userObject = JSON.parse(user);
      this._user.set(userObject);
    }
  }

  setUser(user: User) {
    this._user.set(user);
  }

  clearUser() {
    this._user.set(null);
    localStorage.removeItem('LoggedUser');
  }
}
