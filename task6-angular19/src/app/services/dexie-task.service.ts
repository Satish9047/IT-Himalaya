import { Injectable } from '@angular/core';

import { Task } from '../core/task';
import { DexieService } from './dexie.service';
import { getFormattedDate } from '../utils/date';

@Injectable({
  providedIn: 'root',
})
export class DexieTaskService {
  constructor(private dexieService: DexieService) {}

  async addTask(task: Task): Promise<void> {
    await this.dexieService.taskTable.add(task);
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    await this.dexieService.taskTable
      .where({ id: taskId, userId: userId })
      .delete();
  }

  async updateTaskToCompleted(task: Task, userId: string): Promise<void> {
    await this.dexieService.taskTable
      .where({ id: task.id, userId: userId })
      .modify({
        completed: true,
        completedAt: getFormattedDate(),
      });
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return await this.dexieService.taskTable
      .where({ userId: userId })
      .toArray();
  }
}
