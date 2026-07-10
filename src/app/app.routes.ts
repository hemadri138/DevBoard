import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
