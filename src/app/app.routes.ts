import { Routes } from '@angular/router';
import { NavigationRoute } from './common/constant/navigation-route.enum';

export const routes: Routes = [
  {
    path: NavigationRoute.HOMEPAGE,
    loadComponent: () => import('./pages/homepage/homepage').then(m => m.Homepage),
    title: 'page.homepage.title'
  },
  {
    path: NavigationRoute.HOW_IT_WORKS,
    loadComponent: () => import('./pages/how-it-works/how-it-works').then(m => m.HowItWorks),
    title: 'page.howItWorks.title'
  },
  {
    path: NavigationRoute.SERVICES,
    loadComponent: () => import('./pages/services/services').then(m => m.Services),
    title: 'page.services.title'
  },
  // {
  //   path: NavigationRoute.ARTICLES_AND_ADVICE,
  //   loadChildren: () => import('./pages/articles-and-advice/articles-and-advice.routes').then(r => r.routes)
  // },
  {
    path: NavigationRoute.EMPTY,
    redirectTo: NavigationRoute.HOMEPAGE_REDIRECT,
    pathMatch: NavigationRoute.FULL
  },
  {
    path: NavigationRoute.WILDCARD,
    loadComponent: () => import('./pages/homepage/homepage').then(m => m.Homepage)
  }
];
