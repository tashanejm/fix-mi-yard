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
                iconStyleClass: 'text-[var(--contractor-name-icon-color)]',
                key: 'contractorName'
              },
              {
                icon: this.materialSymbols.PHOTO,
                label: this.translateService.instant('page.howItWorks.fields.photo'),
                iconStyleClass: 'text-[var(--photo-icon-color)]',
                key: 'photo'
              },
              {
                icon: this.materialSymbols.LOCATION_ON,
                label: this.translateService.instant('page.howItWorks.fields.location'),
                iconStyleClass: 'text-[var(--location-icon-color)]',
                key: 'location'
              },
              {
                icon: this.materialSymbols.STAR,
                label: this.translateService.instant('page.howItWorks.fields.ratingAndReviews'),
                iconStyleClass: 'text-[var(--rating-icon-color)]',
                key: 'ratingAndReviews'
              }
            ]
          }
        },
        {
          label: this.translateService.instant('page.howItWorks.fields.exploreContractorProfiles'),
          value: {
            description: this.translateService.instant('page.howItWorks.fields.exploreContractorProfilesDescription'),
            image: '/images/mock/explore-contractor-profiles.jpg',
            key: 'exploreContractorProfiles'
          }
        },
        {
          label: this.translateService.instant('page.howItWorks.fields.connectWithAContractor'),
          value: {
            description: this.translateService.instant('page.howItWorks.fields.connectWithAContractorDescription'),
            image: '/images/mock/connect-with-a-contractor.jpg',
            key: 'connectWithAContractor'
          }
        }
      ];
    });
  }
}
