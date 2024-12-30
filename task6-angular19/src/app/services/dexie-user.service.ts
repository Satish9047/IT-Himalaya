import { Injectable } from '@angular/core';

import { DexieService } from './dexie.service';
import { LoginData, User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class DexieUserService {
  constructor(private dexieService: DexieService) {}

  async AddUser(user: User) {
    try {
      const res = this.dexieService.userTable.add(user);
      return res;
    } catch (error) {
      console.log('error while saving user in indexedDB');
      return null;
    }
  }

  async getUserByEmail(user: LoginData) {
    try {
      const res = await this.dexieService.userTable
        .where({ email: user.email })
        .first();
      if (res) {
        // const resWithOutPassword = { ...res, password: undefined };
        return res;
      }
      return null;
    } catch (error) {
      console.log('error while fetching user');
      return null;
    }
  }
}
