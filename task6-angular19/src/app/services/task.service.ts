import {
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Task } from '../core/task';
import { LocalforageService } from './localforage.service';
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
    private localforageService: LocalforageService,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
    effect(() => {
      this.currentUser = this.user();
    });
  }

  async loadTasks(): Promise<Task[]> {
    if (this.currentUser === null) {
      return [];
    }
    try {
      const storeInstance = this.localforageService.getStoreInstance(
        this.currentUser,
      );
      const tasks = await storeInstance.getItem<Task[]>('tasks');
      if (tasks) {
        const taskLoad: Task[] = [];
        tasks.forEach((task) => {
          const newTask = new Task(
            task.id,
            task.description,
            task.createdAt,
            task.dueDate,
            task.completed,
            task.completedAt,
          );
          taskLoad.push(newTask);
        });
        this._tasks.set(taskLoad);
        return tasks;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async addTask(task: Task): Promise<boolean> {
    if (!this.user()) {
      return false;
    }
    this._tasks.update((tasks) => [...tasks, task]);

    try {
      if (this.currentUser) {
        const storeInstance = this.localforageService.getStoreInstance(
          this.currentUser,
        );
        const res = await storeInstance.setItem('tasks', this._tasks());
        if (res) {
          console.log('addTask in localforage', res);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async markTaskAsCompleted(taskId: string) {
    this._tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          task.MarkTaskToCompleted();
          if (this.currentUser) {
            const storeInstance = this.localforageService.getStoreInstance(
              this.currentUser,
            );
            storeInstance
              .setItem('tasks', tasks) // Use original tasks array
              .then((res) => {
                if (res) {
                  console.log('update Task in localforage', res);
                }
              })
              .catch((error) => {
                console.error('Error updating tasks in localforage', error);
              });
          }
        }
        return task;
      }),
    );
  }

  async deleteTask(taskId: string) {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
    try {
      if (this.currentUser) {
        const storeInstance = this.localforageService.getStoreInstance(
          this.currentUser,
        );
        const res = await storeInstance.setItem('tasks', this._tasks());
        if (res) {
          console.log('delete Task in localforage', res);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error deleting tasks in localforage', error);
      return false;
    }
  }

  clearTasks() {
    this._tasks.set([]);
  }
}
