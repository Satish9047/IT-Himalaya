import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';

import { User } from '../../../interface/interface';
import { UserService } from '../../../services/user.service';

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
    private router: Router,
  ) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
