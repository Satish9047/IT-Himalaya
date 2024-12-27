import { Injectable } from '@angular/core';
import { WritableSignal, signal } from '@angular/core';

import { User } from '../interface/interface';
import { LocalforageService } from './localforage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: WritableSignal<User | null> = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor(private localforageService: LocalforageService) {
    this.localforageService
      .initialize()
      .then((user) => {
        this._user.set(user);
        console.log('User loaded from LocalForage:userService:', user);
      })
      .catch((error) => {
        console.error('Error loading user:', error);
        this._user.set(null);
      });
  }

  setUser(user: User) {
    this._user.set(user);
  }

  clearUser() {
    this._user.set(null);
    const storeInstance = this.localforageService.getLoggedUserStoreInstance();
    storeInstance.clear();
  }
}
