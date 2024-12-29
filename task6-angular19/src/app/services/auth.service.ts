import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { LoginData, Response, User } from '../interface/interface';
import { DexieUserService } from './dexie-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userService: UserService,
    private dexieUserService: DexieUserService,
  ) {
    this.autoLogin();
  }

  async registerUser(user: User): Promise<Response<User>> {
    try {
      const res = await this.dexieUserService.AddUser(user);
      if (res) {
        return {
          success: true,
          message: 'User saved to indexedDB.',
          data: null,
        };
      } else {
        return {
          success: false,
          message: 'Fail to save localForage.',
          data: null,
        };
      }
    } catch (error) {
      console.log('error while registering');
      return {
        success: false,
        message: 'Fail to save localForage.',
        data: null,
      };
    }
  }

  async loginUser(userData: LoginData): Promise<Response<User>> {
    try {
      const res = await this.dexieUserService.getUserByEmail(userData);
      if (res) {
        if (userData.password === res.password) {
          this.userService.setUser(res);
          localStorage.setItem('LoggedUser', JSON.stringify(res));
          return {
            success: true,
            message: 'Login Successful',
            data: res,
          };
        } else {
          return {
            success: false,
            message: 'Invalid Credentials',
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: 'Login Unsuccessful',
          data: null,
        };
      }
    } catch (error) {
      console.log('error while logging in');
      return {
        success: false,
        message: 'Login Unsuccessful',
        data: null,
      };
    }
  }

  autoLogin(): User | null {
    try {
      const loggedUser = localStorage.getItem('LoggedUser');
      if (loggedUser) {
        const user: User = JSON.parse(loggedUser);
        this.userService.setUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.log('error while auto login', error);
      return null;
    }
  }
}
