import { Component, signal, WritableSignal } from '@angular/core';
import { Card } from 'primeng/card';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchCriteria } from '../../components/search-criteria/search-criteria';
import { QuickSelection } from './quick-selection/quick-selection';

@Component({
  selector: 'app-homepage',
  imports: [
    Card,
    TranslatePipe,
    SearchCriteria,
    QuickSelection
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  protected selection: WritableSignal<string> = signal('');

  protected onSelectionChane(selection: string) {
    this.selection.set(selection);
  }
}
