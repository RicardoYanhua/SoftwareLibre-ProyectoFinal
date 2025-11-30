import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule, 
    RouterModule, 
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
