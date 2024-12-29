import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Task } from '../core/task';
import { User } from '../interface/interface';
import { getFormattedDate } from '../utils/date';
import { DexieService } from './dexie.service';

@Injectable({
  providedIn: 'root',
})
export class DexieTaskService {
  constructor(private dexieService: DexieService) {}

  // Add a task
  async addTask(task: Task): Promise<void> {
    const res = await this.dexieService.taskTable.add(task);
    console.log('addTask in Dexie', res);
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    await this.dexieService.taskTable
      .where({ id: taskId, userId: userId })
      .delete();
  }

  async updateTaskToCompleted(task: Task, userId: string): Promise<void> {
    console.log('updateTaskToCompleted in Dexie', task);
    await this.dexieService.taskTable
      .where({ id: task.id, userId: userId })
      .modify({
        completed: true,
        completedAt: getFormattedDate(),
      });
  }

  async getUserTasks(userId: string | number): Promise<Task[]> {
    return await this.dexieService.taskTable
      .where({ userId: userId })
      .toArray();
  }
}
