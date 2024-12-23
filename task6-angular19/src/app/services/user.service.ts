import { Injectable } from '@angular/core';
import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }
}
