import { CommonModule } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';

import { Task } from '../../../core/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-completed-tasks',
  imports: [CommonModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css',
})
export class CompletedTasksComponent {
  tasks: Signal<Task[]>;
  completedTasks: Signal<Task[]>;
  constructor(private taskService: TaskService) {
    this.taskService.loadTasks();
    this.tasks = this.taskService.tasks;

    this.completedTasks = computed(() => {
      return this.tasks().filter((task) => task.completed);
    });
  }

  deleteCompletedTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}
