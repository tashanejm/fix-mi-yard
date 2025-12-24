import { Component, computed, Signal } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { Base } from '../../common/base';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation-menu',
  imports: [
    Menubar
  ],
  templateUrl: './navigation-menu.html',
  styleUrl: './navigation-menu.scss'
})
export class NavigationMenu extends Base {
  public navigationItems$!: Signal<MenuItem[]>;

  constructor() {
    super();
    this.initializeNavigationItems();
  }

  private initializeNavigationItems(): void {
    this.navigationItems$ = computed(() => {
      return [
        {
          label: this.translateService.instant('page.home.title'),
          icon: 'pi pi-home',
          routerLink: this.navigationRoute.HOMEPAGE
        },
        {
          label: this.translateService.instant('page.howItWorks.title'),
          icon: 'pi pi-info-circle',
          routerLink: this.navigationRoute.HOW_IT_WORKS
        },
        {
          label: this.translateService.instant('page.forContractors.title'),
          icon: 'pi pi-envelope',
          routerLink: this.navigationRoute.FOR_CONTRACTORS
        },
        {
          label: this.translateService.instant('page.articlesAndAdvice.title'),
          icon: 'pi pi-cog',
          routerLink: this.navigationRoute.ARTICLES_AND_ADVICE
        }
      ];
    });
  }
}
