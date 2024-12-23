import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { User } from '../../../interface/interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser();
  }
}
