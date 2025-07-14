import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    ButtonDirective
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
}
