import {
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { Task } from '../core/task';
import { SqlService } from './sql.service';
import { UserService } from './user.service';
import { User } from '../interface/interface';

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
      const res = await this.sqlService.getAllUserTasks(
        Number(this.currentUser.id),
      );
      // console.log('load task form taskService', res);
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
    try {
      const res = await this.sqlService.addTask(task);
      if (res) {
        console.log(res);
        this._tasks.update((tasks) => [...tasks, res]);
      } else {
        console.log('error while adding task');
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async markTaskAsCompleted(taskId: string) {
    this._tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId && this.currentUser) {
          const numericTaskId = Number(taskId);
          task.MarkTaskToCompleted();
          this.sqlService.updateTask(numericTaskId, task);
        }
        return task;
      }),
    );
  }

  async deleteTask(taskId: string) {
    if (!this.currentUser) {
      return;
    }
    try {
      const numericTaskId = Number(taskId);
      const numUserId = Number(this.currentUser.id);
      const res = await this.sqlService.deleteTask(numericTaskId, numUserId);
      if (res) {
        console.log(res);
        this._tasks.update((tasks) =>
          tasks.filter((task) => task.id !== taskId),
        );
      } else {
        console.log('error while deleting task');
      }
    } catch (error) {
      console.log('Error deleting tasks', error);
    }
  }

  clearTasks() {
    this._tasks.set([]);
  }
}
