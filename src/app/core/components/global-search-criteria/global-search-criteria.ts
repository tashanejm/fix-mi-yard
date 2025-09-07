import { Component } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Base } from '../../common/base';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-global-search-criteria',
  imports: [
    IconField,
    InputIcon,
    InputText,
    TranslatePipe
  ],
  templateUrl: './global-search-criteria.html',
  styleUrl: './global-search-criteria.scss'
})
export class GlobalSearchCriteria extends Base {

}
