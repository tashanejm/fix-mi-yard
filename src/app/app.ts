import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { NavigationMenu } from './components/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NavigationMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fix-mi-yard');
}
