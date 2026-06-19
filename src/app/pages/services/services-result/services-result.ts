import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';
import { Divider } from 'primeng/divider';
import { Base } from '../../../common/base';
import { SelectItem } from 'primeng/api';
import { Select } from 'primeng/select';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services-result',
  imports: [
    Divider,
    Select,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './services-result.html',
  styleUrl: './services-result.scss'
})
export class ServicesResult extends Base {
  public sortOptions!: Signal<SelectItem[]>;
  protected selectedSortOption: WritableSignal<string> = signal('relevance' );

  constructor() {
    super();
    this.computeSortOptions();
    effect(() => {
      console.log(this.selectedSortOption())
    });
  }

  private computeSortOptions(): void {
    this.sortOptions = computed(() => {
      return [
        { label: this.translateService.instant('page.services.fields.relevance'), value: 'relevance' },
        { label: this.translateService.instant('page.services.fields.topRated'), value: 'topRated' },
        { label: this.translateService.instant('page.services.fields.mostReviewed'), value: 'mostReviewed' }
      ];
    });
  }
}
