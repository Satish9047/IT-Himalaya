import { UserService } from './../../../services/user.service';
import { Component, Signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { TaskService } from '../../../services/task.service';
import { Task } from '../../../core/task';
import { getDueDate, getFormattedDate } from '../../../utils/date';
import { User } from '../../../interface/interface';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  user!: Signal<User | null>;
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
  }

  //Form
  addTaskForm: FormGroup = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  //Add Task
  addTask() {
    if (this.userService.user()?.id) {
      const userId = this.user()?.id;
      if (userId) {
        const createdAt = getFormattedDate();
        const dueDate = getDueDate();
        const newTask = new Task(
          userId,
          this.addTaskForm.value.description,
          createdAt,
          dueDate,
        );
        this.taskService.addTask(newTask);
      }
    }
    this.addTaskForm.reset();
  }
}
