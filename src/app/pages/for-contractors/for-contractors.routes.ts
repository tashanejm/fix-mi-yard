import { Routes } from '@angular/router';
import { NavigationRoute } from '../../core/navigation-route.enum';

export const routes: Routes = [
  {
    path: NavigationRoute.EMPTY,
    title: 'page.forContractors.title',
    loadComponent: () => import('./for-contractors').then(c => c.ForContractors)
  }
];
