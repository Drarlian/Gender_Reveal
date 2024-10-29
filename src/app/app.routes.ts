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
    path: 'placar',
    loadComponent: () => import('./modules/global/pages/scoreboard/scoreboard.component').then((m) => m.ScoreboardComponent)
  },
  {
    path: 'success',
    loadComponent: () => import('./modules/global/pages/success-page/success-page.component').then((m) => m.SuccessPageComponent)
  },
  {
    path: 'error',
    loadComponent: () => import('./modules/global/pages/error-page/error-page.component').then((m) => m.ErrorPageComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./modules/global/pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
