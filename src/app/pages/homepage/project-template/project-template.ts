import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from 'primeng/card';
import { Base } from '../../../core/common/base';
import { ProjectTemplateModel } from './project-template.model';
import { ProjectTemplateKey } from './project-template-key';
import { Carousel, CarouselResponsiveOptions } from 'primeng/carousel';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-project-template',
  imports: [
    TranslatePipe,
    Card,
    Carousel,
    NgOptimizedImage
  ],
  templateUrl: './project-template.html',
  styleUrl: './project-template.scss'
})
export class ProjectTemplate extends Base {
  public projects: Signal<ProjectTemplateModel[]>;
  public readonly projectTemplateKey: typeof ProjectTemplateKey;
  public readonly responsiveOptions: WritableSignal<CarouselResponsiveOptions[]>;
  constructor() {
    super();
    this.projectTemplateKey = ProjectTemplateKey;
    this.computeProjects();
    this.responsiveOptions = signal([]);
    this.initResponsiveOptions();
  }

  private initResponsiveOptions(): void {
    /*TODO: set correct breakpoints, number visible and number scroll*/
    this.responsiveOptions.set([
      {
        breakpoint: '1400px',
        numVisible: 6,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]);
}

  private computeProjects(): void {
    this.projects = computed(() => {
      return [
        {
          title: this.translateService.instant('page.home.fields.furnitureAssembly'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'furniture-assembly',
          key: this.projectTemplateKey.FURNITURE_ASSEMBLY
        },
        {
          title: this.translateService.instant('page.home.fields.mountArtOrShelves'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'mount-art-or-shelves',
          key: this.projectTemplateKey.Mount_ART_OR_SHELVES
        },
        {
          title: this.translateService.instant('page.home.fields.mountTv'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'mount-a-tv',
          key: this.projectTemplateKey.MOUNT_TV
        },
        {
          title: this.translateService.instant('page.home.fields.homeCleaning'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'home-cleaning',
          key: this.projectTemplateKey.HOME_CLEANING
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '37'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '36'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '35'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '34'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '33'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '32'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '31'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '3'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '2'
        },
        {
          title: this.translateService.instant('page.home.fields.electricalHelp'),
          image: '/images/mock/pan.jpg',
          description: '',
          id: 'electrical-help',
          key: this.projectTemplateKey.ELECTRICAL_HELP + '1'
        }
      ];
    });
  }

  test2(projectTemplateModels: unknown): string {
    return "";
  }
}
