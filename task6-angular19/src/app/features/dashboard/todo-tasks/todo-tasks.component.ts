import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, Signal } from '@angular/core';

import { Task } from '../../../core/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-todo-tasks',
  imports: [CommonModule],
  templateUrl: './todo-tasks.component.html',
  styleUrl: './todo-tasks.component.css',
})
export class TodoTasksComponent implements OnInit {
  tasks: Signal<Task[]>;
  todoTasks: Signal<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.tasks;
    this.todoTasks = computed(() =>
      this.tasks().filter((task) => !task.completed),
    );
  }

  //On Initialization
  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  //Delete Method
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
  //Completed Method
  completedTask(taskId: string): void {
    this.taskService.markTaskAsCompleted(taskId);
  }
}
