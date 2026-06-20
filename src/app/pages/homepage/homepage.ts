import { Component, signal, WritableSignal } from '@angular/core';
import { Card } from 'primeng/card';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchCriteria } from '../../components/search-criteria/search-criteria';
import { QuickSelection } from './quick-selection/quick-selection';
import { PopularProjects } from './popular-projects/popular-projects';
import { ArticlesAndAdvice } from './articles-and-advice/articles-and-advice';

@Component({
  selector: 'app-homepage',
  imports: [
    Card,
    TranslatePipe,
    SearchCriteria,
    QuickSelection,
    PopularProjects,
    ArticlesAndAdvice
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
