import { Routes } from '@angular/router';
import { privateGuard, publicGuard, emailVerificationGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    canActivateChild: [privateGuard(), emailVerificationGuard],
    path: 'tasks',
    loadChildren: () => import('./task/features/task.routes'),
  },

];
