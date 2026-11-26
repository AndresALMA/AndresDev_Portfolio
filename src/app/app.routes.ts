import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'AndresDev | Portfolio',
    loadComponent: () => import('./features/home/home').then((module) => module.Home),
  },
  {
    path: 'projects',
    title: 'Projects | AndresDev',
    loadComponent: () => import('./features/projects/projects').then((module) => module.Projects),
  },
  { path: '**', redirectTo: '' },
];
