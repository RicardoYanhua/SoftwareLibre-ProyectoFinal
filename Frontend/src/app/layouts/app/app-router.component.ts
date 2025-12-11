import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-router',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './app-router.component.html',
  styleUrl: './app-router.component.css'
})
export class AppRouterComponent {
  sidebarCollapsed = false;

  ngOnInit() {
    const saved = localStorage.getItem('sidebarCollapsed');
    this.sidebarCollapsed = saved === 'true';
  }

  disableInitialTransition = true;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed.toString());

  }
}
