import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonDirective, ButtonLabel } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    ButtonDirective,
    ButtonLabel,
    Ripple
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
