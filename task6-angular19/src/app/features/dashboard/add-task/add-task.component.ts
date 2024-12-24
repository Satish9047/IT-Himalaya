import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { TaskService } from '../../../services/task.service';
import { Task } from '../../../core/task';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  constructor(private taskService: TaskService) {}

  addTaskForm: FormGroup = new FormGroup({
    taskDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  addTask() {
    console.log(this.addTaskForm.value);
    //add new task
    const taskId = Date.now().toString();
    const newTask = new Task(taskId, this.addTaskForm.value.taskDescription);
    this.taskService.addTask(newTask);

    this.addTaskForm.reset();
  }
}
