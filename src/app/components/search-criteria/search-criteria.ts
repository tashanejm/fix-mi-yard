import { Component, model, ModelSignal } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Base } from '../../common/base';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-criteria',
  imports: [
    IconField,
    InputIcon,
    InputText,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './search-criteria.html',
  styleUrl: './search-criteria.scss'
})
export class SearchCriteria extends Base {
  public value: ModelSignal<string> = model<string>('');
}
