import {
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { Task } from '../core/task';
import { UserService } from './user.service';
import { User } from '../interface/interface';
import { DexieTaskService } from './dexie-task.service';
import { SqlService } from './sql.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: WritableSignal<Task[]> = signal([]);
  readonly tasks = this._tasks.asReadonly();
  user: Signal<User | null>;
  currentUser!: User | null;

  constructor(
    private userService: UserService,
    private dexieTaskService: DexieTaskService,
    private sqlService: SqlService,
  ) {
    this.user = this.userService.user;
    effect(() => {
      this.currentUser = this.user();
    });
  }

  async loadTasks(): Promise<Task[]> {
    if (!this.currentUser || this.currentUser.id === null) {
      return [];
    }
    try {
      const res = await this.dexieTaskService.getUserTasks(this.currentUser.id);
      const tasks = res.map((task) => {
        return new Task(
          task.userId,
          task.description,
          task.createdAt,
          task.dueDate,
          task.completed,
          task.completedAt,
          task.id,
        );
      });
      this._tasks.set(tasks);
      return res;
    } catch (error) {
      console.log('error while loading tasks');
      return [];
    }
  }

  async addTask(task: Task): Promise<boolean> {
    if (!this.user()) {
      return false;
    }
    this._tasks.update((tasks) => [...tasks, task]);
    try {
      // await this.dexieTaskService.addTask(task);
      await this.sqlService.addTask(task);
      return true;
    } catch (error) {
      return false;
    }
  }

  async markTaskAsCompleted(taskId: string) {
    this._tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId && this.currentUser) {
          task.MarkTaskToCompleted();
          this.dexieTaskService.updateTaskToCompleted(
            task,
            this.currentUser.id,
          );
        }
        return task;
      }),
    );
  }

  async deleteTask(taskId: string) {
    if (!this.currentUser) {
      return;
    }
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
    try {
      const res = await this.dexieTaskService.deleteTask(
        taskId,
        this.currentUser.id,
      );
    } catch (error) {
      console.log('Error deleting tasks', error);
    }
  }

  clearTasks() {
    this._tasks.set([]);
  }
}
