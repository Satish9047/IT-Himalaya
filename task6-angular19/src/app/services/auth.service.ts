import { LocalforageService } from './localforage.service';
import { Injectable } from '@angular/core';
import { LoginData, Response, User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  constructor(private localforageService: LocalforageService) {}

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
        return { success: false, message: 'User not found.', data: existUser };
      }
      if (existUser.password !== userData.password) {
        return { success: false, message: 'Invalid password.', data: null };
      }

      const loggerStoreInstance =
        this.localforageService.getLoggedUserStoreInstance();
      try {
        await loggerStoreInstance.setItem('loggedUser', this.user);
        return { success: true, message: 'User logged in.', data: existUser };
      } catch (error: any) {
        return { success: false, message: error.message, data: null };
      }
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message, data: null };
    }
  }
}
