import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../core/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: WritableSignal<Task[]> = signal([]);
  readonly tasks = this._tasks.asReadonly();

  constructor() {}

  addTask(task: Task): void {
    this._tasks.update((tasks) => [...tasks, task]);
  }

  markTaskAsCompleted(taskId: string): void {
    this._tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === taskId) {
          task.MaskTaskToComplete();
        }
        return task;
      });
    });
  }

  deleteTask(taskId: string): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }
}
