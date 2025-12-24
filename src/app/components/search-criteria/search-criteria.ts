import { Component } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Base } from '../../common/base';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search-criteria',
  imports: [
    IconField,
    InputIcon,
    InputText,
    TranslatePipe
  ],
  templateUrl: './search-criteria.html',
  styleUrl: './search-criteria.scss'
})
export class SearchCriteria extends Base {
  // protected dtTest: any | undefined = {
    //   button: {
    //     root: {
    //       primary: {
    //         background: 'var(--tailwind-blue-500)', // Use the CSS variable
    //         hoverBackground: 'var(--tailwind-blue-600)',
    //         color: 'var(--tailwind-white)'
    //       }
    //     }
    //   },
    //   primary: {
    //     background: 'var(--tailwind-blue-500)', // Use the CSS variable
    //     hoverBackground: 'var(--tailwind-blue-600)',
    //     color: 'var(--tailwind-white)'
    //   }
    // };

}
