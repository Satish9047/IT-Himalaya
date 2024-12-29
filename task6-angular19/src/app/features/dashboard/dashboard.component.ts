import { Component } from '@angular/core';

import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

@Component({
  selector: 'app-dashboard',
  imports: [AddTaskComponent, TodoTasksComponent, CompletedTasksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
