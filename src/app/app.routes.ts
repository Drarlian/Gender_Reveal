import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/global/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'form-area',
    loadComponent: () => import('./modules/global/pages/form-area/form-area.component').then((m) => m.FormAreaComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./modules/global/pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
