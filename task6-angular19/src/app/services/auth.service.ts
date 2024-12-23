import { LocalforageService } from './localforage.service';
import { Injectable } from '@angular/core';
import { Response, User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  constructor(private localforageService: LocalforageService) {}

  async registerUser(user: User): Promise<Response> {
    const storeInstance = this.localforageService.getStoreInstance(user);
    try {
      await storeInstance.setItem('userData', user);
      return { success: true, message: 'User saved to localForage.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async loginUser(): Promise<Response> {
    const storeInstance = this.localforageService.getLoggedUserStoreInstance();
    try {
      await storeInstance.setItem('loggedUser', this.user);
      return { success: true, message: 'User logged in.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
