import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { Base } from '../../../common/base';
import { Carousel } from 'primeng/carousel';
import { SelectItem } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { CarouselResponsiveOptions } from 'primeng/types/carousel';

@Component({
  selector: 'app-popular-projects',
  imports: [
    Carousel,
    TranslatePipe,
    Card,
    NgOptimizedImage,
    ButtonIcon,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './popular-projects.html',
  styleUrl: './popular-projects.scss'
})
export class PopularProjects extends Base {
  public projects!: Signal<SelectItem[]>;
  public readonly responsiveOptions: WritableSignal<CarouselResponsiveOptions[]> = signal([]);

  constructor() {
    super();
    this.computeProjects();
    this.initResponsiveOptions();
  }

  protected override initDesignToken(): void {
    this.designToken = {
      card: {
        borderRadius: '2rem'
      }
    };
  }

  private computeProjects(): void {
    this.projects = computed(() => {
      // Register dependency on language change to update translations
      this.languageChange();

      return [
        {
          label: this.translateService.instant('page.homepage.fields.furnitureAssembly'),
          value: {
            key: 'furnitureAssembly',
            image: '/images/mock/furniture-assembly.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project1Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.mountTv'),
          value: {
            key: 'mountTv',
            image: '/images/mock/mounting-tv.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project2Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.helpMoving'),
          value: {
            key: 'helpMoving',
            image: '/images/mock/movers.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project3Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.homeCleaning'),
          value: {
            key: 'homeCleaning',
            image: '/images/mock/home-cleaning.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project4Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.electricalHelp'),
          value: {
            key: 'electricalHelp',
            image: '/images/mock/electrical.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
      /*  {
          label: this.translateService.instant('page.homepage.fields.welder'),
          value: {
            key: 'welder',
            image: '/images/mock/welder.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.carpenter'),
          value: {
            key: 'carpenter',
            image: '/images/mock/carpentry.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.plumbingLeak'),
          value: {
            key: 'plumbingLeak',
            image: '/images/mock/plumbing-leak.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.painting'),
          value: {
            key: 'painting',
            image: '/images/mock/painting.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.gardenMaintenance'),
          value: {
            key: 'gardenMaintenance',
            image: '/images/mock/garden-maintenance.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.fenceRepair'),
          value: {
            key: 'fenceRepair',
            image: '/images/mock/fence.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        },
        {
          label: this.translateService.instant('page.homepage.fields.tileInstallation'),
          value: {
            key: 'tileInstallation',
            image: '/images/mock/tile-installation.jpg',
            description: this.translateService.instant('page.homepage.popularProjects.project5Description')
          }
        }*/
      ];
    });
  }

  private initResponsiveOptions(): void {
    this.responsiveOptions.set([
      {
        breakpoint: '1536px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '1280px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '640px',
        numVisible: 1,
        numScroll: 1
      }
    ]);
  }
}
