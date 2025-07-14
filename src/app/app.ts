import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header';
import { NavigationMenu } from './core/components/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    NavigationMenu
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'fix-mi-place';
}
