import { Routes } from '@angular/router';
import {NavigationRoute} from './core/navigation-route.enum';
import {Homepage} from './pages/homepage/homepage';

export const routes: Routes = [
  {
    path: NavigationRoute.HOMEPAGE,
    loadComponent: () => Homepage,
    title: 'Homepage' //todo: translate
  },
  {
    path: NavigationRoute.EMPTY,
    redirectTo: NavigationRoute.HOMEPAGE_REDIRECT,
    pathMatch: 'full'
  },
  {
    path: NavigationRoute.WILDCARD,
    loadComponent: () => Homepage,
  }
];
