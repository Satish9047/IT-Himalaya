import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { DexieUserService } from './dexie-user.service';
import { LoginData, Response, User } from '../interface/interface';

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

  //Register Method
  async registerUser(user: User): Promise<Response<User>> {
    try {
      const res = await this.dexieUserService.AddUser(user);
      if (res) {
        return {
          success: true,
          message: 'User saved to indexedDB.',
          data: user,
        };
      } else {
        return {
          success: false,
          message: 'Fail to register user.',
          data: null,
        };
      }
    } catch (error) {
      console.log('error while registering');
      return {
        success: false,
        message: 'Fail to register user.',
        data: null,
      };
    }
  }

  //Login Method
  async loginUser(userData: LoginData): Promise<Response<User>> {
    try {
      const res = await this.dexieUserService.getUserByEmail(userData);
      if (res) {
        if (userData.password === res.password) {
          const userWithoutPassword = { ...res, password: undefined };
          this.userService.setUser(userWithoutPassword);
          localStorage.setItem(
            'LoggedUser',
            JSON.stringify(userWithoutPassword),
          );
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

  //AutoLogin Method
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
