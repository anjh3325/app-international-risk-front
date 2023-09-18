import { Route } from '@angular/router';
import { LayoutPage } from './layout/layout.page';

export const routes: Route[] = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: '',
        loadComponent: () => import('./index/index.page'),
      },
    ],
  },
];
