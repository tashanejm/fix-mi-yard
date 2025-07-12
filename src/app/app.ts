import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Homepage} from './pages/homepage/homepage';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Homepage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'fix-mi-place';
}
