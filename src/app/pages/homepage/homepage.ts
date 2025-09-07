import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { TranslatePipe } from '@ngx-translate/core';
import { GlobalSearchCriteria } from '../../core/components/global-search-criteria/global-search-criteria';
// import { QuickSelection } from './quick-selection/quick-selection';
// import { ProjectTemplate } from './project-template/project-template';

@Component({
  selector: 'app-homepage',
  imports: [
    Card,
    TranslatePipe,
    GlobalSearchCriteria,
    // QuickSelection,
    // ProjectTemplate
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {

}
