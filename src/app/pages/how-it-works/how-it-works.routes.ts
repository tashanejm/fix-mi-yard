import { Routes } from '@angular/router';
import { NavigationRoute } from '../../core/navigation-route.enum';

export const routes: Routes = [
  {
    path: NavigationRoute.EMPTY,
    loadComponent: () => import('./how-it-works').then(c => c.HowItWorks),
    title: 'page.howItWorks.title'
  }
];
