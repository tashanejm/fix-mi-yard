import { Component, computed, Signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Base } from '../../common/base';
import { NavigationRoute } from '../../navigation-route.enum';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  imports: [
    RouterLink,
    RouterLinkActive
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

  public initializeNavigationItems(): void {
    this.navigationItems$ = computed(() => {
      return [
        {
          label: this.translateService.instant('page.home.title'),
          icon: 'pi pi-home',
          routerLink: NavigationRoute.HOMEPAGE
        },
        {
          label: this.translateService.instant('page.howItWorks.title'),
          icon: 'pi pi-info-circle',
          routerLink: NavigationRoute.HOW_IT_WORKS
        },
        {
          label: this.translateService.instant('page.forContractors.title'),
          icon: 'pi pi-envelope',
          routerLink: NavigationRoute.FOR_CONTRACTORS
        },
        {
          label: this.translateService.instant('page.articlesAndAdvice.title'),
          icon: 'pi pi-cog',
          routerLink: NavigationRoute.ARTICLES_AND_ADVICE
        }
      ];
    });
  }
}
