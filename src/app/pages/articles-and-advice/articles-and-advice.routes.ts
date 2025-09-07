import { Routes } from '@angular/router';
import { NavigationRoute } from '../../core/navigation-route.enum';

export const routes: Routes = [
  {
    path: NavigationRoute.EMPTY,
    title: 'page.articlesAndAdvice.title',
    loadComponent: () => import('./articles-and-advice').then(c => c.ArticlesAndAdvice)
  }
];
