import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, Signal } from '@angular/core';

import { Task } from '../../../core/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-completed-tasks',
  imports: [CommonModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css',
})
export class CompletedTasksComponent implements OnInit {
  tasks: Signal<Task[]>;
  completedTasks: Signal<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.tasks;
    this.completedTasks = computed(() => {
      return this.tasks().filter((task) => task.completed);
    });
  }

  //Om Initialization
  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  //Delete Method
  deleteCompletedTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}
