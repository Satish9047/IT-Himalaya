import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { User } from '../../../interface/interface';
import { UserService } from '../../../services/user.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: Signal<User | null>;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.user = this.userService.user;
  }

  //Logout Method
  logout() {
    this.userService.clearUser();
    this.taskService.clearTasks();
    this.router.navigate(['/login']);
  }
}
