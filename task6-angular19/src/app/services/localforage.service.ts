import { Injectable } from '@angular/core';

import localForage from 'localforage';
import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class LocalforageService {
  constructor() {}

  getStoreInstance(user: User) {
    const storeName = user.email.replace('@', '').replace('.', '');
    const storeInstance = localForage.createInstance({
      name: `Users`,
      storeName,
      description: `Data for ${user.email}`,
    });
    return storeInstance;
  }

  getLoggedUserStoreInstance() {
    const storeInstance = localForage.createInstance({
      name: `loggedUser`,
      storeName: 'user',
      description: `Data for logged user`,
    });
    return storeInstance;
  }
}
