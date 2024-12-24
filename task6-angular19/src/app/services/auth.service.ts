import { UserService } from './user.service';
import { LocalforageService } from './localforage.service';
import { Injectable } from '@angular/core';
import { LoginData, Response, User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localforageService: LocalforageService,
    private userService: UserService,
  ) {
    this.autoLogin();
  }

  async registerUser(user: User): Promise<Response<User>> {
    const storeInstance = this.localforageService.getStoreInstance(user);
    try {
      await storeInstance.setItem('userData', user);
      return {
        success: true,
        message: 'User saved to localForage.',
        data: null,
      };
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  }

  async loginUser(userData: LoginData): Promise<Response<User>> {
    const storeInstance = this.localforageService.getStoreInstance(userData);
    try {
      const existUser = await storeInstance.getItem<User>('userData');
      if (!existUser) {
        return { success: false, message: 'User not found.', data: null };
      }
      if (existUser.password !== userData.password) {
        return { success: false, message: 'Invalid password.', data: null };
      }
      //save the user data in the logged user store
      const loggerStoreInstance =
        this.localforageService.getLoggedUserStoreInstance();
      try {
        await loggerStoreInstance.setItem('loggedUser', existUser);
        this.userService.setUser(existUser);
        return { success: true, message: 'User logged in.', data: existUser };
      } catch (error: any) {
        return { success: false, message: error.message, data: null };
      }
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message, data: null };
    }
  }

  async autoLogin(): Promise<User | null> {
    try {
      const storeInstance =
        this.localforageService.getLoggedUserStoreInstance();
      const user = await storeInstance.getItem<User>('loggedUser');
      if (user) {
        this.userService.setUser(user);
      }
      return user;
    } catch (error) {
      console.error('Error during auto-login:', error);
      return null;
    }
  }
}
