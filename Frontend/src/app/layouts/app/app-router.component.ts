import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-router',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink

  ],
  templateUrl: './app-router.component.html',
  styleUrl: './app-router.component.css'
})
export class AppRouterComponent {
// estado del sidebar
sidebarCollapsed = false;

constructor() {
// Si quieres recordar el estado del sidebar entre recargas
const saved = localStorage.getItem('sidebarCollapsed');
if (saved !== null) {
this.sidebarCollapsed = JSON.parse(saved);
}
}

toggleSidebar() {
this.sidebarCollapsed = !this.sidebarCollapsed;

// guarda el estado si deseas persistencia
localStorage.setItem('sidebarCollapsed', JSON.stringify(this.sidebarCollapsed));

}
}
