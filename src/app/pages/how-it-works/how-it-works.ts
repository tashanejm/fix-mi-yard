import { Component, computed, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Base } from '../../common/base';
import { SelectItem } from 'primeng/api';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  imports: [
    TranslatePipe,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss'
})
export class HowItWorks extends Base {
  public items!: Signal<SelectItem[]>;

  constructor() {
    super();
    this.computeItems();
  }

  private computeItems(): void {
    this.items = computed(() => {
      this.languageChange();

      return [
        {
          label: this.translateService.instant('page.howItWorks.fields.searchAndDiscover'),
          value: {
            description: this.translateService.instant('page.howItWorks.fields.searchAndDiscoverDescription'),
            image: '/images/mock/search-and-discover.jpg',
            details: [
              {
                icon: this.materialSymbols.BADGE,
                label: this.translateService.instant('page.howItWorks.fields.contractorName'),
                key: 'contractorName'
              },
              {
                icon: this.materialSymbols.PHOTO,
                label: this.translateService.instant('page.howItWorks.fields.photo'),
                key: 'photo'
              },
              {
                icon: this.materialSymbols.LOCATION_CITY,
                label: this.translateService.instant('page.howItWorks.fields.location'),
                key: 'location'
              },
              {
                icon: this.materialSymbols.STAR,
                label: this.translateService.instant('page.howItWorks.fields.ratingAndReviews'),
                key: 'ratingAndReviews'
              }
            ]
          }
        }
      ];
    });
  }
}
