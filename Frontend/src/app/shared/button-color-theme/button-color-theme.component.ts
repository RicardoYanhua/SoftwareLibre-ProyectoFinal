import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-color-theme',
  templateUrl: './button-color-theme.component.html',
  styleUrl: './button-color-theme.component.css'
})
export class ButtonColorThemeComponent implements OnInit {
  
  TemaSeleccionado: 'light' | 'dark' = 'light'; 
 
  ngOnInit(): void {

    const temaGuardado = localStorage.getItem('color-scheme');
    if (temaGuardado === 'dark' || temaGuardado === 'light') {
      this.TemaSeleccionado = temaGuardado;
    } else {

      const preferencia = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      this.TemaSeleccionado = preferencia;
    }

    this.aplicarTema();

    setTimeout(() => {
      document.body.classList.add('color-scheme-transition');
    });
  }

  toggleTema() {
    this.TemaSeleccionado = this.TemaSeleccionado === 'light' ? 'dark' : 'light';
    localStorage.setItem('color-scheme', this.TemaSeleccionado);
    this.aplicarTema();
  }

  aplicarTema() {
    const html = document.documentElement;
    html.classList.remove('color-scheme-light', 'color-scheme-dark');
    html.classList.add('color-scheme-' + this.TemaSeleccionado);
  }

}