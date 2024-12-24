import { CommonModule } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';

import { Task } from '../../../core/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-todo-tasks',
  imports: [CommonModule],
  templateUrl: './todo-tasks.component.html',
  styleUrl: './todo-tasks.component.css',
})
export class TodoTasksComponent {
  tasks: Signal<Task[]>;
  todoTasks: Signal<Task[]>;
  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.tasks;

    this.todoTasks = computed(() =>
      this.tasks().filter((task) => !task.completed),
    );
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  completedTask(taskId: string): void {
    this.taskService.markTaskAsCompleted(taskId);
  }
}
