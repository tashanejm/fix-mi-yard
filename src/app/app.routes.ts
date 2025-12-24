import { Routes } from '@angular/router';
import { NavigationRoute } from './common/constant/navigation-route.enum';
import { Homepage } from './pages/homepage/homepage';

export const routes: Routes = [
  {
    path: NavigationRoute.HOMEPAGE,
    loadComponent: () => Homepage,
    title: 'page.home.title'
  },
  // {
  //   path: NavigationRoute.HOW_IT_WORKS,
  //   loadChildren: () => import('./pages/how-it-works/how-it-works.routes').then(r => r.routes)
  // },
  // {
  //   path: NavigationRoute.FOR_CONTRACTORS,
  //   loadChildren: () => import('./pages/for-contractors/for-contractors.routes').then(r => r.routes)
  // },
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
    loadComponent: () => Homepage
  }
];
