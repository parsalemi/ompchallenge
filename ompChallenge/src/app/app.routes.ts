import { Routes } from '@angular/router';
import { loginGuard } from './core/guard/login.guard';
import { checkAuthGuard } from './core/guard/check-auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: "full"
  },
  {
    path: 'dashboard/signIn',
    canActivate: [loginGuard],
    loadComponent: () => import('./components/dashboard/sign-in/sign-in.component').then( c => c.SignInComponent)
  },
  {
    path: 'dashboard',
    loadChildren: () => import("./components/dashboard/dashboard.route").then(c => c.routes),
  },

];
