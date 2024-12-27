import { Injectable } from '@angular/core';

import localForage from 'localforage';
import { LoginData, User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class LocalforageService {
  private loggedUserStore = localForage.createInstance({
    name: `loggedUser`,
    storeName: 'user',
    description: `Data for logged user`,
  });

  constructor() {}

  getLoggedUserStoreInstance() {
    return this.loggedUserStore;
  }

  async initialize(): Promise<User | null> {
    try {
      const user = await this.getLoggedUser();
      console.log('User from LocalforageService:', user);
      return user;
    } catch (error) {
      console.error('Error initializing LocalForage:', error);
      return null;
    }
  }

  async getLoggedUser() {
    const storeInstance = this.getLoggedUserStoreInstance();
    const user = await storeInstance.getItem<User>('loggedUser');
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  getStoreInstance(user: LoginData) {
    const storeName = user.email.replace('@', '').replace('.', '');
    const storeInstance = localForage.createInstance({
      name: `Users`,
      storeName,
      description: `Data for ${user.email}`,
    });
    return storeInstance;
  }
}
