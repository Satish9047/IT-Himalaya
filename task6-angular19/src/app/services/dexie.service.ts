import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Task } from '../core/task';
import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class DexieService extends Dexie {
  taskTable!: Table<Task, number>;
  userTable!: Table<User, number>;

  constructor() {
    super('TaskDB'); // Database name

    this.version(1).stores({
      tasksTable:
        '++id, description, createdAt, dueDate, completed, completedAt, userId',
      userTable: '++id, firstName, lastName, email, password',
    });

    this.taskTable = this.table('tasksTable');
    this.userTable = this.table('userTable');
  }
}
