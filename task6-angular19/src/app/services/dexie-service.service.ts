import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Task } from '../core/task';

@Injectable({
  providedIn: 'root',
})
export class DexieServiceService extends Dexie {
  taskDB!: Table<Task, number>;
  constructor() {
    super('TaskDB'); //database name
    this.version(1).stores({
      tasks: '++id, title, description, dueDate, priority, status', //Schema
    });
  }

  // Add a task
  async addTask(task: Task): Promise<void> {
    await this.taskDB.add(task);
  }
}
